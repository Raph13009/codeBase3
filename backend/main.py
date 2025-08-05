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
from dotenv import load_dotenv

# Charger les variables d'environnement depuis la racine du projet
load_dotenv(dotenv_path="../.env")

# Initialiser le client OpenAI avec la clé API
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permettre tous les origines pour le développement
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROMPT = """
This is a quality certificate.

Extract two structured sections:

1. A key:value list of certificate metadata (e.g. Product, Lot no., Expiration Date, etc.)
2. A full table with columns: Characteristic, Method, Specification, Result.

Be exhaustive, even if some values are missing.

Return a JSON object like:
{
  "header": [{"key": "...", "value": "..."}, ...],
  "table": [{"Characteristic": "...", "Method": "...", "Specification": "...", "Result": "..."}, ...]
}
"""

def encode_image(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")

def parse_gpt_response(content):
    try:
        match = content[content.index("{"):content.rindex("}")+1]
        return json.loads(match)
    except Exception as e:
        print(f"❌ JSON parsing error: {e}")
        return None

def process_image(image_path):
    b64_image = encode_image(image_path)
    try:
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
        return response.choices[0].message.content
    except Exception as e:
        print(f"❌ API error on {image_path}: {e}")
        return None

def save_excel(json_data, excel_path):
    header_df = pd.DataFrame(json_data["header"])
    header_df.columns = ["Clé", "Valeur"]
    table_df = pd.DataFrame(json_data["table"])
    with pd.ExcelWriter(excel_path, engine="openpyxl") as writer:
        header_df.to_excel(writer, index=False, startrow=0, startcol=0, sheet_name="Sheet1")
        table_df.to_excel(writer, index=False, startrow=len(header_df) + 2, startcol=0, sheet_name="Sheet1")

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}

@app.post("/Convert")
async def Convert_file(file: UploadFile = File(...)):
    try:
        # Vérifier que la clé API est configurée
        if not os.getenv("OPENAI_API_KEY"):
            return JSONResponse({"error": "OpenAI API key not configured"}, status_code=500)

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
        
        # Traitement avec GPT Vision
        response_text = process_image(image_path)
        if not response_text:
            return JSONResponse({"error": "Failed to process image with GPT Vision"}, status_code=500)

        # Extraction du JSON
        data = parse_gpt_response(response_text)
        if not data:
            return JSONResponse({"error": "Failed to parse GPT response"}, status_code=500)

        # Génération du fichier Excel
        excel_path = temp_dir / "output.xlsx"
        save_excel(data, excel_path)

        # Retourne le fichier Excel
        return FileResponse(
            path=str(excel_path),
            filename="Converted.xlsx",
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

    except Exception as e:
        print(f"❌ Error in Convert_file: {e}")
        return JSONResponse({"error": f"Internal server error: {str(e)}"}, status_code=500)
