# This file defines the search endpoint for contractors.
# It allows users to search for contractors using the creteria name, KRA PIN, or registration number.

from fastapi import APIRouter, Query
from services.data_loader import load_json

router = APIRouter()

@router.get("/search")
def search_contractors(q: str = Query(...)):
    contractors = load_json("contractors.json")
    results = [
        c for c in contractors
        if q.lower() in c["name"].lower()
        or q in c["kra_pin"]
        or q in c["registration_number"]
    ]
    return results