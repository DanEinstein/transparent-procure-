"""
TransparentProcure API — Main Entry Point
==========================================

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