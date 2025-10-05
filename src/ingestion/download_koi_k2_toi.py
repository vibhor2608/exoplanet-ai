# src/ingestion/download_koi_k2_toi.py

import os
import requests
import pandas as pd
from io import StringIO
from datetime import datetime, timezone
import json

# ===============================
# DATA DIRECTORY
# ===============================
DATA_DIR = r"C:\Users\vibho\Downloads\Engineering\exoplanet-ai\data\raw"
os.makedirs(DATA_DIR, exist_ok=True)

# ===============================
# DATASET URLs (TAP Sync CSV)
# ===============================
DATASETS = {
    "koi": "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+koi&format=csv",
    "toi": "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+toi&format=csv",
    "k2":  "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+k2pandc&format=csv"
}

# ===============================
# FUNCTION TO DOWNLOAD & SAVE DATA
# ===============================
def download_dataset(name, url):
    print(f"Fetching {name.upper()} dataset from {url} ...")
    try:
        resp = requests.get(url, timeout=60)
        resp.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {name.upper()} dataset: {e}")
        return None

    # Read CSV into DataFrame
    df = pd.read_csv(StringIO(resp.text))
    csv_file = os.path.join(DATA_DIR, f"{name}_cumulative.csv" if name=="koi" else f"{name}_table.csv")
    metadata_file = os.path.join(DATA_DIR, f"{name}_metadata.json")

    # Save CSV
    df.to_csv(csv_file, index=False)
    print(f"{name.upper()} dataset saved to {csv_file}")

    # Create metadata
    metadata = {
        "source_url": url,
        "download_timestamp": datetime.now(timezone.utc).isoformat(),
        "local_path": csv_file,
        "num_rows": int(df.shape[0]),
        "num_columns": int(df.shape[1]),
        "columns": list(df.columns)
    }

    # Save metadata JSON
    with open(metadata_file, "w") as f:
        json.dump(metadata, f, indent=4)
    print(f"Metadata saved to {metadata_file}\n")

    return df

# ===============================
# MAIN EXECUTION
# ===============================
if __name__ == "__main__":
    koi_df = download_dataset("koi", DATASETS["koi"])
    toi_df = download_dataset("toi", DATASETS["toi"])
    k2_df  = download_dataset("k2", DATASETS["k2"])
