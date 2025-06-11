import os
import json
import base64
import time
import pandas as pd
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
from pdf2image import convert_from_path
from PIL import Image

# Chargement clé API
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

INPUT_DIR = "input_png"
OUTPUT_DIR = "output_excel"
os.makedirs(OUTPUT_DIR, exist_ok=True)

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

def convert_pdf_to_pngs(pdf_dir, png_dir):
    """Convertit tous les PDF de pdf_dir en PNG dans png_dir (1 PNG par page, nommés <pdfname>_pageN.png)."""
    os.makedirs(png_dir, exist_ok=True)
    for pdf_path in Path(pdf_dir).glob("*.pdf"):
        pdf_stem = pdf_path.stem
        # Vérifie si déjà converti (première page)
        first_png = Path(png_dir) / f"{pdf_stem}_page1.png"
        if first_png.exists():
            continue
        try:
            images = convert_from_path(str(pdf_path), dpi=300)
            for i, img in enumerate(images):
                out_path = Path(png_dir) / f"{pdf_stem}_page{i+1}.png"
                img.save(out_path, "PNG")
            print(f"🖼️ {pdf_path.name} -> {len(images)} PNG(s)")
        except Exception as e:
            print(f"❌ Erreur conversion {pdf_path.name}: {e}")

def main():
    # Conversion PDF->PNG avant tout
    convert_pdf_to_pngs("input_pdf", "input_png")
    png_files = list(Path(INPUT_DIR).glob("*.png"))
    if not png_files:
        print("📂 No PNG files found in input_png/")
        return

    for png_path in png_files:
        start = time.time()
        print(f"\n🔍 Processing {png_path.name}...")

        response_text = process_image(png_path)
        if not response_text:
            continue

        # Sauvegarde brute
        txt_path = Path(OUTPUT_DIR) / f"{png_path.stem}_raw.txt"
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(response_text)

        data = parse_gpt_response(response_text)
        if not data:
            continue

        # Sauvegarde Excel
        excel_path = Path(OUTPUT_DIR) / f"{png_path.stem}_gpt4o.xlsx"
        save_excel(data, excel_path)
        print(f"✅ Done: {excel_path.name} ({time.time() - start:.1f}s)")

if __name__ == "__main__":
    main()
