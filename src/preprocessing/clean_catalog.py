# src/preprocessing/clean_catalog.py

import os
import pandas as pd
import numpy as np

# ===============================
# DATA FILE PATHS
# ===============================
RAW_DIR = r"C:\Users\vibho\Downloads\Engineering\exoplanet-ai\data\raw"
PROCESSED_DIR = os.path.join(os.path.dirname(RAW_DIR), "processed")
os.makedirs(PROCESSED_DIR, exist_ok=True)

KOI_FILE = os.path.join(RAW_DIR, "koi_cumulative.csv")
TOI_FILE = os.path.join(RAW_DIR, "toi_table.csv")
K2_FILE  = os.path.join(RAW_DIR, "k2_table.csv")

# ===============================
# LOAD DATASETS
# ===============================
print("Loading KOI dataset...")
koi = pd.read_csv(KOI_FILE)
print(f"KOI shape: {koi.shape}")

print("Loading TOI dataset...")
toi = pd.read_csv(TOI_FILE)
print(f"TOI shape: {toi.shape}")

print("Loading K2 dataset...")
k2 = pd.read_csv(K2_FILE)
print(f"K2 shape: {k2.shape}")

# ===============================
# CLEAN & FILTER DATASETS
# ===============================
# Example: remove columns that are mostly NaN or irrelevant
def filter_koi(df):
    columns_to_keep = [
        'kepid', 'kepoi_name', 'kepler_name', 'koi_disposition', 'koi_score',
        'koi_fpflag_nt','koi_fpflag_ss','koi_fpflag_co','koi_fpflag_ec',
        'koi_period', 'koi_time0bk','koi_eccen','koi_longp','koi_impact',
        'koi_duration','koi_ingress','koi_depth','koi_ror','koi_srho',
        'koi_fittype','koi_prad','koi_sma','koi_incl','koi_teq','koi_insol',
        'koi_dor','koi_steff','koi_slogg','koi_smet','koi_srad','koi_smass',
        'koi_sage','koi_kepmag'
    ]
    return df[columns_to_keep]

def filter_toi(df):
    # Keep only main numeric/categorical columns (adjust as needed)
    # For simplicity, keep all for now
    return df

def filter_k2(df):
    # Keep only main numeric/categorical columns (adjust as needed)
    return df

koi_clean = filter_koi(koi)
toi_clean = filter_toi(toi)
k2_clean  = filter_k2(k2)

# ===============================
# MERGE DATASETS
# ===============================
# We cannot do a row-wise merge since these are different targets; we append with a 'source' column
koi_clean['source'] = 'koi'
toi_clean['source'] = 'toi'
k2_clean['source']  = 'k2'

# Align columns for append (fill missing columns with NaN)
all_columns = sorted(set(koi_clean.columns) | set(toi_clean.columns) | set(k2_clean.columns))

def align_columns(df, all_cols):
    missing_cols = [col for col in all_cols if col not in df.columns]
    if missing_cols:
        df = pd.concat([df, pd.DataFrame({col: np.nan for col in missing_cols}, index=df.index)], axis=1)
    return df[all_cols]


koi_clean = align_columns(koi_clean, all_columns)
toi_clean = align_columns(toi_clean, all_columns)
k2_clean  = align_columns(k2_clean, all_columns)

merged = pd.concat([koi_clean, toi_clean, k2_clean], ignore_index=True)
print(f"Merged dataset shape: {merged.shape}")

# ===============================
# SAVE MERGED CATALOG
# ===============================
MERGED_FILE = os.path.join(PROCESSED_DIR, "merged_catalog.parquet")
merged.to_parquet(MERGED_FILE, index=False)
print(f"Merged catalog saved to {MERGED_FILE}")

# ===============================
# FEATURE SELECTION FOR ML/DL
# ===============================
# Example: drop ID columns, keep numeric/categorical features
X = merged.drop(columns=['kepid','kepoi_name','kepler_name','source'])
y = merged['koi_disposition'].combine_first(merged.get('disposition'))

# Save features
FEATURES_FILE = os.path.join(PROCESSED_DIR, "features.parquet")
X.to_parquet(FEATURES_FILE, index=False)
print(f"Features saved to {FEATURES_FILE}")
