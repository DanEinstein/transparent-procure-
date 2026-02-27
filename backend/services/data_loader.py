"""
Data loader utilities for reading/writing JSON data files.
"""

import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data")


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