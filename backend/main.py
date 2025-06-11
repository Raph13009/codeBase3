from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import pandas as pd
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://www.boostaiconsulting.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_excel_response():
    file_path = "output.xlsx"
    file_like = open(file_path, mode="rb")
    return StreamingResponse(
        file_like,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=converted.xlsx"}
    )

@app.post("/convert")
async def convert_file(file: UploadFile = File(...)):
    # Exemple de génération d'un vrai fichier Excel
    df = pd.DataFrame({"A": [1, 2], "B": [3, 4]})
    df.to_excel("output.xlsx", index=False)
    return generate_excel_response()
