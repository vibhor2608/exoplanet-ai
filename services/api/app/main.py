from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from .predict import predict_exoplanets

app = FastAPI(title="Exoplanet Detection API", version="1.0")

class InputData(BaseModel):
    data: List[Dict[str, Any]]

@app.post("/predict")
def predict_endpoint(payload: InputData):
    try:
        result = predict_exoplanets(payload.data)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
