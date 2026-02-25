from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import uuid
from datetime import datetime

# Import the data loader service and whistle-blower service.
from services.data_loader import get_all_tenders, get_all_payments, load_json
from services.whistleblower import save_report

app = FastAPI(title="TransparentProcure API - MVP")

# Set up CORS middleware 
# This allows your React frontend (localhost:5173) to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- TENDERS & SEARCH 

@app.get("/tenders")
async def read_tenders(
    county: Optional[str] = None, 
    category: Optional[str] = None,
    page: int = 1,
    limit: int = 10
):
    """
    Returns a filtered, paginated list of tenders. [cite: 38, 57]
    """
    tenders = get_all_tenders()
    
    if county:
        tenders = [t for t in tenders if t.get("county").lower() == county.lower()]
    if category:
        tenders = [t for t in tenders if t.get("category").lower() == category.lower()]
        
    # Simple pagination logic
    start = (page - 1) * limit
    end = start + limit
    return tenders[start:end]

@app.get("/tender/{id}")
async def read_tender(id: str):
    """
    Returns full details for a specific tender. [cite: 38, 57]
    """
    tenders = get_all_tenders()
    tender = next((t for t in tenders if t["id"] == id), None)
    
    if not tender:
        raise HTTPException(status_code=404, detail="Tender not found")
    return tender

# --- COUNTIES & ENTITIES

@app.get("/counties")
async def read_counties():
    """
    Returns all 47 counties with tender counts and total values. [cite: 43, 57]
    """
    tenders = get_all_tenders()
    stats = {}
    for t in tenders:
        c_name = t.get("county")
        if c_name not in stats:
            stats[c_name] = {"name": c_name, "tender_count": 0, "total_value": 0}
        stats[c_name]["tender_count"] += 1
        stats[c_name]["total_value"] += t.get("value", 0)
    
    return list(stats.values())

# --- WHISTLE-BLOWER

@app.post("/whistle-blower")
async def create_report(report: dict):
    """
    Accepts anonymous reports. Returns a reference number. [cite: 57]
    No PII is stored. [cite: 48]
    """
    if not report.get("project_ref") or not report.get("description"):
        raise HTTPException(status_code=400, detail="Description and Project Ref are required")
    
    result = save_report(report)
    if result:
        return result
    raise HTTPException(status_code=500, detail="Internal storage error")

# --- HEALTH CHECK ---
@app.get("/")
async def root():
    return {"message": "TransparentProcure API is live", "version": "0.1.0-MVP"}