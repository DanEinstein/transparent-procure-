"""
Data loader utilities for reading/writing JSON data files.
"""

import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data")

def clean_numerical_value(value):
    """
    Standardizes currency strings into floats.
    """
    if isinstance(value, (int, float)):
        return float(value)
    if isinstance(value, str):
        sanitized = re.sub(r'[^\d.]', '', value)
        try:
            return float(sanitized) if sanitized else 0.0
        except ValueError:
            return 0.0
    return 0.0

def load_json(filename: str) -> list | dict:
    """Load and return JSON data from the data directory."""
    path = os.path.join(DATA_PATH, filename)
    if not os.path.exists(path):
        return []

    with open(path, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

            data = json.load(f)
            if not isinstance(data, list):
                return data

            for item in data:
                if isinstance(item, dict):
                    # Requirement: Global label for all mock data
                    item["is_demo_data"] = True
                    
                    # --- CONDITIONAL CLEANING (The Improvement) ---
                    # Only clean if the keys exist to avoid corrupting 
                    # non-financial files like posts.json or contractors.json
                    if 'value' in item:
                        item['value'] = clean_numerical_value(item['value'])
                    
                    if 'benchmark_value' in item:
                        item['benchmark_value'] = clean_numerical_value(item['benchmark_value'])
                    else:
                        # Only set a default benchmark if 'value' exists 
                        # This prevents adding 'benchmark_value: 1' to social posts
                        if 'value' in item:
                            item['benchmark_value'] = 1.0

            return data
        except json.JSONDecodeError:
            return []

# Existing functions remain untouched to preserve Day 1/2 stability
def get_all_tenders():
    return load_json("tender.json")

def save_json(filename: str, data) -> None:
    """Save data to a JSON file in the data directory."""
    path = os.path.join(DATA_PATH, filename)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=2, default=str)


def load_mock_data(key: str | None = None):
    """
    Load data from the centralized mock_data.json.
    If key is provided, return that specific section.
    """
    data = load_json("mock_data.json")
    if key and isinstance(data, dict):
        return data.get(key, [])
    return data
def get_all_contractors():
    return load_json("contractors.json")

# New Day 3 function for the Feed
def get_all_posts():
    return load_json("posts.json")
