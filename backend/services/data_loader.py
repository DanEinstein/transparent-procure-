import json
import os

# Define the path to your 'data' folder relative to this file
# This ensures it works whether you run from /backend or the root 
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data")

def load_json(filename: str):
    """
    Core utility to read JSON mock files.
    """
    path = os.path.join(DATA_PATH, filename)
    if not os.path.exists(path):
        return []
    
    with open(path, "r") as f:
        data = json.load(f)
        # Requirement: All mock data must have a DEMO DATA label 
        for item in data:
            if isinstance(item, dict):
                item["is_demo_data"] = True
        return data

def get_all_tenders():
    """Returns the full list of tenders."""
    return load_json("tender.json")

def get_all_payments():
    """Returns the full list of payment records."""
    return load_json("payment.json")

def get_all_contractors():
    """Returns the full list of contractor profiles."""
    return load_json("contractors.json")