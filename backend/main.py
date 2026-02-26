from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List

# Import your data loader logic
from services.data_loader import load_json

app = FastAPI(title="TransparentProcure API - MVP")

# --- INFRASTRUCTURE CONFIG (CORS) ---
# Allows your React frontend (port 5173) to fetch data
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API ROUTER SETUP ---
# This adds the "/api" prefix expected by the Frontend apiService.js
api_router = APIRouter(prefix="/api")

@api_router.get("/tenders")
async def read_tenders():
    """
    Returns the list of contractors for the Registry page.
    Note: We are mapping contractors to this endpoint to sync with the 
    current Frontend Registry component.
    """
    try:
        data = load_json("tender.json")
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Infrastructure Error: {str(e)}")
    
@api_router.get("/contractors")
async def read_contractors():
    """
    Registry Page Data Source.
    Loads contractors.json for the entity list.
    """
    return load_json("contractors.json")

@api_router.get("/payments")
async def read_payments():
    """
    Returns financial history records.
    """
    return load_json("payment.json")

@api_router.get("/counties")
async def read_counties():
    """
    Day 2 Aggregation: Calculates stats per county from the tender data.
    """
    tenders = load_json("tender.json")
    stats = {}
    for t in tenders:
        c_name = t.get("county", "Unknown")
        if c_name not in stats:
            stats[c_name] = {"name": c_name, "tender_count": 0, "total_value": 0}
        stats[c_name]["tender_count"] += 1
        stats[c_name]["total_value"] += t.get("value", 0)
    return list(stats.values())

# --- INCLUDE ROUTES ---
app.include_router(api_router)

@app.get("/")
async def root():
    return {
        "message": "TransparentProcure Backend is Live",
        "env": "Development",
        "port": 3001
    }