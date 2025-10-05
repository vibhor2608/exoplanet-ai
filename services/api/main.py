# services/api/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os
import traceback

# ------------------------------
# PATH SETUP
# ------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "../../model/model.pkl")
PREPROCESSOR_PATH = os.path.join(BASE_DIR, "../../model/preprocessor.pkl")

# ------------------------------
# LOAD MODEL AND PIPELINE
# ------------------------------
try:
    model = joblib.load(MODEL_PATH)
    preprocessor = joblib.load(PREPROCESSOR_PATH)
    print("✅ Model and preprocessor loaded successfully.")
except Exception as e:
    print(f"❌ Failed to load model/preprocessor: {e}")
    model = None
    preprocessor = None

# ------------------------------
# FASTAPI APP
# ------------------------------
app = FastAPI(title="Exoplanet Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend during dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------
# REQUEST SCHEMA
# ------------------------------
class PredictRequest(BaseModel):
    orbital_period: float
    planet_radius: float
    stellar_temperature: float
    stellar_radius: float
    flux: float
    signal_to_noise: float
    transit_duration: float
    transit_depth: float

# ------------------------------
# HEALTH CHECK
# ------------------------------
@app.get("/health")
def health():
    return {"status": "ok"}

# ------------------------------
# PREDICT ENDPOINT
# ------------------------------
@app.post("/predict")
def predict(data: PredictRequest):
    if model is None or preprocessor is None:
        raise HTTPException(status_code=500, detail="Model or preprocessor not loaded.")

    try:
        # Convert input JSON to DataFrame
        input_df = pd.DataFrame([data.dict()])

        # ✅ Apply the SAME preprocessing used during training
        X_processed = preprocessor.transform(input_df)

        # ✅ Predict
        preds = model.predict(X_processed)
        probs = model.predict_proba(X_processed)[:, 1] if hasattr(model, "predict_proba") else None

        return {
            "prediction": int(preds[0]),
            "probability": round(float(probs[0]), 3) if probs is not None else None,
            "label": "Likely Exoplanet" if preds[0] == 1 else "False Positive"
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=f"Prediction error: {e}")
