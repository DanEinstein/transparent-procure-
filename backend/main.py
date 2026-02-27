from fastapi import FastAPI, HTTPException, APIRouter, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from services.reputation import calculate_contractor_score

# Import your data loader logic
from services.data_loader import load_json

app = FastAPI(title="TransparentProcure API - MVP")

# --- INFRASTRUCTURE CONFIG (CORS) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

@api_router.get("/tenders")
async def read_tenders(
    skip: int = Query(0, description="Pagination offset"),
    limit: int = Query(100, description="Pagination limit"),
    county: Optional[str] = Query(None, description="Filter by county name"),
    category: Optional[str] = Query(None, description="Filter by procurement category"),
    status: Optional[str] = Query(None, description="Filter by project status")
):
    """
    Paginated list with filtering by county, category, and status.
    """
    tenders = load_json("tender.json") 
    
    # 1. Apply Filters
    if county:
        tenders = [t for t in tenders if t.get("county", "").lower() == county.lower()]
    if category:
        tenders = [t for t in tenders if t.get("category", "").lower() == category.lower()]
    if status:
        tenders = [t for t in tenders if t.get("status", "").lower() == status.lower()]

    # 2. Standardize data and apply risk flags
    for t in tenders:
        t["title"] = t.get("title") or t.get("name") or "Untitled Project"
        # Enforce DEMO DATA label globally
        t["is_demo_data"] = True 
        
        val = t.get("value", 0)
        bench = t.get("benchmark_value", 1)
        
        if (val / bench) > 1.5:
            t["risk_flag"] = "High Price Anomaly"
            t["is_critical"] = True
        else:
            t["is_critical"] = False

    # 3. Apply Pagination
    paginated_tenders = tenders[skip : skip + limit]
    
    # Return paginated wrapper
    return {
        "total": len(tenders),
        "skip": skip,
        "limit": limit,
        "data": paginated_tenders
    }

@api_router.get("/tender/{tender_id}")
async def get_tender(tender_id: str):
    """
    Full tender detail including awarded contractor, value, and site location.
    """
    tenders = load_json("tender.json")
    for t in tenders:
        if t.get("id") == tender_id:
            # Enforce demo data flag
            t["is_demo_data"] = True
            # In a real app, you would join contractor details here
            return t
            
    raise HTTPException(status_code=404, detail=f"Tender {tender_id} not found")
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
async def read_payments(county: Optional[str] = Query(None)):
    """
    Day 4: Payment records exposing Chronic Pending bills.
    Adapted for the pre-calculated payment.json schema.
    """
    payments = load_json("payment.json") # using your exact filename
    
    # Filter by checking if the search term is IN the entity_name
    if county:
        payments = [p for p in payments if county.lower() in p.get("entity_name", "").lower()]

    for p in payments:
        # Fulfilling the requirement: Flag any pending > 180 days
        if p.get("status") == "Pending" and p.get("days_outstanding", 0) > 180:
            p["risk_flag"] = "Chronic Pending"
        else:
            p["risk_flag"] = None

    return {"data": payments}

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
        "env": "Development",
        "port": 3001
    }