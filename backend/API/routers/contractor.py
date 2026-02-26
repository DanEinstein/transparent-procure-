from fastapi import APIRouter, HTTPException
from services.data_loader import load_json

router = APIRouter()

@router.get("/contractor/{contractor_id}")
def get_contractor_profile(contractor_id: int):
    contractors = load_json("contractors.json")
    tenders = load_json("tenders.json")

    contractor = next((c for c in contractors if c["id"] == contractor_id), None)

    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")

    contractor_tenders = [
        t for t in tenders if t["contractor_id"] == contractor_id
    ]

    return {
        "profile": contractor,
        "tenders": contractor_tenders,
        "reputation_score": contractor.get("reputation_score", 60),
        "overburden": contractor.get("oveburden", False)
    }

    