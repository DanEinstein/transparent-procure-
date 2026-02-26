from fastapi import APIRouter
from datetime import date
from services.data_loader import load_json

router = APIRouter()

@router.get("/stalled-projects")
def stalled_projects():
    contracts = load_json("contracts.json")
    today = date.today()

    stalled = []
    for c in contracts:
        if date.fromisoformat(c["end_date"]) < today:
            c["days_overdue"] = (today - date.fromisoformat(c["end_date"])).days
            stalled.append(c)

    return stalled    
