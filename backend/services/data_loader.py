import json
import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data")

def clean_numerical_value(value):
    if isinstance(value, (int, float)):
        return float(value)
    if isinstance(value, str):
        sanitized = re.sub(r'[^\d.]', '', value)
        try:
            return float(sanitized) if sanitized else 0.0
        except ValueError:
            return 0.0
    return 0.0

def load_json(filename: str):
    path = os.path.join(DATA_PATH, filename)
    if not os.path.exists(path):
        return []
    
    with open(path, "r") as f:
        try:
            data = json.load(f)
            for item in data:
                if isinstance(item, dict):
                    item["is_demo_data"] = True
                    # Ensure these keys ALWAYS exist for the Audit math
                    item['value'] = clean_numerical_value(item.get('value', 0))
                    item['benchmark_value'] = clean_numerical_value(item.get('benchmark_value', 1)) # Default to 1 to avoid / 0
            return data
        except json.JSONDecodeError:
            return []

def get_all_tenders():
    return load_json("tender.json")

def get_all_payments():
    return load_json("payment.json")

def get_all_contractors():
    return load_json("contractors.json")