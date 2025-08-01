from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pathlib import Path
import shutil
import uuid
import os
import base64
import json
import pandas as pd
from pdf2image import convert_from_path
from openai import OpenAI

client = OpenAI()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://www.boostaiconsulting.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROMPT = (
    "Lis ce certificat de qualité. Sépare les informations générales (métadonnées) et le tableau principal. "
    "Retourne un JSON structuré comme ceci : "
    "{\"header\": [{\"key\": \"...\", \"value\": \"...\"}, ...], "
    "\"table\": [{\"Characteristic\": \"...\", \"Method\": \"...\", \"Specification\": \"...\", \"Result\": \"...\"}, ...]} "
    "Sois exhaustif, même si certaines valeurs sont manquantes."
)

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}

@app.post("/Convert")
async def Convert_file(file: UploadFile = File(...)):
    # Création d'un dossier temporaire unique
    job_id = str(uuid.uuid4())
    temp_dir = Path("temp") / job_id
    temp_dir.mkdir(parents=True, exist_ok=True)
    pdf_path = temp_dir / file.filename
    png_dir = temp_dir / "pngs"
    png_dir.mkdir(exist_ok=True)

    # Sauvegarde le PDF uploadé
    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Convertit le PDF en PNG (une page à la fois)
    images = convert_from_path(str(pdf_path), dpi=300)
    png_paths = []
    for i, img in enumerate(images):
        out_path = png_dir / f"page_{i+1}.png"
        img.save(out_path, "PNG")
        png_paths.append(out_path)

    # On ne traite que la première page pour l'instant
    image_path = png_paths[0]
    with open(image_path, "rb") as img_file:
        b64_image = base64.b64encode(img_file.read()).decode("utf-8")

    # Appel à GPT Vision
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64_image}"}}
            ]}
        ],
        max_tokens=2000
    )
    content = response.choices[0].message.content

    # Extraction du JSON
    try:
        match = content[content.index("{"):content.rindex("}")+1]
        data = json.loads(match)
    except Exception as e:
        return JSONResponse({"error": f"JSON parsing error: {e}"}, status_code=500)

    # Génération du fichier Excel
    header_df = pd.DataFrame(data["header"])
    header_df.columns = ["Clé", "Valeur"]
    table_df = pd.DataFrame(data["table"])
    excel_path = temp_dir / "output.xlsx"
    with pd.ExcelWriter(excel_path, engine="openpyxl") as writer:
        header_df.to_excel(writer, index=False, startrow=0, startcol=0, sheet_name="Sheet1")
        header_df.to_excel(writer, index=False, startrow=len(header_df) + 2, startcol=0, sheet_name="Sheet1")

    # Retourne le fichier Excel
    return FileResponse(
        path=str(excel_path),
        filename="Converted.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
