import pandas as pd
import numpy as np
import joblib
import os
from typing import List, Dict, Any

# === Load artifacts ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PIPELINE_PATH = os.path.join(BASE_DIR, "../../../data/processed/label_encoder.pkl")
MODEL_PATH = os.path.join(BASE_DIR, "../../../data/processed/XGBoost_final_model.pkl")

print(f"🔹 Loading pipeline from: {PIPELINE_PATH}")
print(f"🔹 Loading model from: {MODEL_PATH}")

pipeline = joblib.load(PIPELINE_PATH)
model = joblib.load(MODEL_PATH)

print("✅ Pipeline and model loaded successfully.")


def align_features(input_df: pd.DataFrame, reference_features: List[str]) -> pd.DataFrame:
    """
    Aligns input DataFrame columns to match the reference features used during training.
    Missing columns are filled with 0, and extra columns are dropped.
    """
    input_cols = set(input_df.columns)
    ref_cols = set(reference_features)

    # Identify missing/extra columns
    missing = ref_cols - input_cols
    extra = input_cols - ref_cols

    if missing:
        print(f"⚠️ Missing {len(missing)} columns — filling with zeros.")
        for col in missing:
            input_df[col] = 0

    if extra:
        print(f"⚠️ Dropping {len(extra)} unexpected columns.")
        input_df = input_df.drop(columns=list(extra))

    # Reorder columns
    input_df = input_df[reference_features]

    return input_df


def predict_exoplanets(input_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Predict exoplanet probability and class for incoming JSON.
    """

    # Convert to DataFrame
    input_df = pd.DataFrame(input_data)

    # Ensure proper feature alignment
    if hasattr(pipeline, "feature_names_in_"):
        ref_features = list(pipeline.feature_names_in_)
    elif hasattr(model, "feature_names_in_"):
        ref_features = list(model.feature_names_in_)
    else:
        raise ValueError("❌ Could not determine reference feature names from pipeline or model.")

    input_df = align_features(input_df, ref_features)

    # Transform features using the same preprocessing pipeline
    X_processed = pipeline.transform(input_df)

    # Get predictions and probabilities
    preds = model.predict(X_processed)
    probs = model.predict_proba(X_processed)[:, 1] if hasattr(model, "predict_proba") else None

    # Prepare response
    response = []
    for i in range(len(preds)):
        response.append({
            "prediction": int(preds[i]),
            "probability": float(probs[i]) if probs is not None else None
        })

    return {"results": response}
