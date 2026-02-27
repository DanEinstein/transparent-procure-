"""
TransparentProcure API — Main Entry Point

Run with:
    uvicorn main:app --port 3001 --reload

The frontend (Vite on port 5173) auto-detects this backend
by pinging GET /api/health.

Backend team notes:
- All endpoints return the standard response envelope:
    { success, statusCode, message, data, timestamp }
- Mock data lives in data/mock_data.json
- Each router file is clearly marked with TODO comments
    where you'll replace mock logic with real DB queries.
"""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, APIRouter, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from services.reputation import calculate_contractor_score

# --- Router imports ---
from routers import health, auth, dashboard, feed, registry, fraud, audit, reports
from routers import utils as utils_router

# --- App setup ---
app = FastAPI(
    title="TransparentProcure API",
    description="Government procurement transparency platform — Kenya",
    version="2.0.0",
)

# --- CORS — allow the React frontend ---
# --- INFRASTRUCTURE CONFIG (CORS) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://127.0.0.1:5173",
        "http://localhost:3000",   # possible alternative
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include all routers under /api ---
app.include_router(health.router,     prefix="/api")
app.include_router(auth.router,       prefix="/api")
app.include_router(dashboard.router,  prefix="/api")
app.include_router(feed.router,       prefix="/api")
app.include_router(registry.router,   prefix="/api")
app.include_router(fraud.router,      prefix="/api")
app.include_router(audit.router,      prefix="/api")
app.include_router(reports.router,    prefix="/api")
app.include_router(utils_router.router, prefix="/api")

api_router = APIRouter(prefix="/api")

@api_router.get("/tenders")
async def read_tenders():
    """
    Audit Page Data Source. 
    Standardizes keys and cross-references citizen reports to flag risks.
    """
    tenders = load_json("tender.json") 
    posts = load_json("posts.json") # Bring in the citizen data
    
    # 1. Create a fast lookup set of project IDs that citizens have flagged
    delayed_refs = {
        p.get("referenceId") for p in posts 
        if p.get("status") == "delay_reported" and p.get("referenceId")
    }

    for t in tenders:
        t["title"] = t.get("title") or t.get("name") or "Untitled Project"
        val = t.get("value", 0)
        bench = t.get("benchmark_value", 1)
        t_id = t.get("id") # The project ID to match against posts
        
        risk_flags = []
        
        # 2. Government Data Risk: Financial Anomaly
        if (val / bench) > 1.5:
            risk_flags.append("Price Anomaly")
            
        # 3. Citizen Oversight Risk: Delay Reported
        if t_id and t_id in delayed_refs:
            risk_flags.append("Citizen Flag")
            
        # 4. Apply the combined flags
        if risk_flags:
            # Joins multiple flags, e.g., "Price Anomaly + Citizen Flag"
            t["risk_flag"] = " + ".join(risk_flags) 
            t["is_critical"] = True
        else:
            t["is_critical"] = False
            # Ensure we clear any old flags
            if "risk_flag" in t:
                del t["risk_flag"]
            
    return tenders
# --- UPDATED COMMUNITY FEED LOGIC ---
@api_router.get("/posts")
async def read_posts(wardId: Optional[str] = Query(None)):
    """
    Day 3: Serving filtered crowdsourced citizen reports.
    Simplified to return a FLAT ARRAY to match other endpoints.
    """
    all_posts = load_json("posts.json")
    
    if not wardId or wardId == "All Activities":
        return all_posts  # Returns the flat list

    # Flexible filtering
    filtered_posts = [
        p for p in all_posts 
        if p.get("wardId") == wardId or 
           (p.get("county") and p.get("county") in wardId) or 
           p.get("category") == wardId
    ]
    
    return filtered_posts

@api_router.get("/contractors")
async def read_contractors():
    """
    Registry Page Data Source.
    Fixed the parameter order to prevent the 500 Internal Server Error.
    """
    contractors = load_json("contractors.json")
    tenders = load_json("tender.json")
    posts = load_json("posts.json")
    
    for c in contractors:
        c_id = c.get("id")
        
        # FIX: The order MUST match reputation.py (tenders, posts, id)
        c["trust_score"] = calculate_contractor_score(tenders, posts, c_id)
        
        # Add a visual risk tier for the frontend
        if c["trust_score"] >= 80:
            c["risk_level"] = "Low"
        elif c["trust_score"] >= 50:
            c["risk_level"] = "Medium"
        else:
            c["risk_level"] = "High (Blacklist Warning)"
            
    return contractors

@api_router.get("/payments")
async def read_payments():
    return load_json("payment.json")

@api_router.get("/counties")
async def read_counties():
    tenders = load_json("tender.json")
    stats = {}
    for t in tenders:
        c_name = t.get("county", "Unknown")
        if c_name not in stats:
            stats[c_name] = {"name": c_name, "tender_count": 0, "total_value": 0}
        stats[c_name]["tender_count"] += 1
        stats[c_name]["total_value"] += t.get("value", 0)
    return list(stats.values())

app.include_router(api_router)

@app.get("/")
async def root():
    return {
        "message": "TransparentProcure Backend is Live",
        "version": "2.0.0",
        "docs": "/docs",
        "health": "/api/health",
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3001, reload=True)