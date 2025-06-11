from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
from pathlib import Path
import uuid
import os
import sys

# Ajoute le dossier courant au path pour import script.py
sys.path.append(str(Path(__file__).parent))

import script  # On importe le script comme un module

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/convert")
async def convert_pdf(file: UploadFile = File(...)):
    # Génère un identifiant unique pour éviter les collisions
    job_id = str(uuid.uuid4())
    temp_dir = Path("temp") / job_id
    input_pdf_dir = temp_dir / "input_pdf"
    input_png_dir = temp_dir / "input_png"
    output_excel_dir = temp_dir / "output_excel"
    input_pdf_dir.mkdir(parents=True, exist_ok=True)
    input_png_dir.mkdir(parents=True, exist_ok=True)
    output_excel_dir.mkdir(parents=True, exist_ok=True)

    # Sauvegarde le PDF uploadé
    pdf_path = input_pdf_dir / file.filename
    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Lance la conversion (en appelant les fonctions du script)
    script.convert_pdf_to_pngs(str(input_pdf_dir), str(input_png_dir))
    png_files = list(input_png_dir.glob("*.png"))
    if not png_files:
        return JSONResponse({"error": "No PNG files generated"}, status_code=400)

    # On ne traite que la première page pour l'instant
    png_path = png_files[0]
    response_text = script.process_image(str(png_path))
    if not response_text:
        return JSONResponse({"error": "Failed to process image"}, status_code=500)

    data = script.parse_gpt_response(response_text)
    if not data:
        return JSONResponse({"error": "Failed to parse response"}, status_code=500)

    excel_filename = f"{pdf_path.stem}_converted.xlsx"
    excel_path = output_excel_dir / excel_filename
    script.save_excel(data, str(excel_path))

    # Retourne le fichier Excel
    return FileResponse(
        path=str(excel_path),
        filename=excel_filename,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
