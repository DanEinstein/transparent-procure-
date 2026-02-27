"""Utility endpoints — search, wards, counties, file upload."""

import json
from typing import Optional

from fastapi import APIRouter, File, Form, Query, UploadFile
from services.data_loader import load_mock_data
from utils.response import success_response

router = APIRouter(prefix="/utils", tags=["utils"])


@router.post("/upload")
async def upload_file(file: UploadFile = File(...), folder: Optional[str] = Form(None)):
    """
    Backend team: save file to storage (local disk or cloud).
    For now returns metadata without actually saving.
    """
    return success_response(
        data={
            "url": f"/uploads/{folder or 'general'}/{file.filename}",
            "filename": file.filename,
            "size": file.size,
            "type": file.content_type,
        },
        message="File uploaded successfully",
    )


@router.get("/search")
async def search(
    q: str = Query(...),
    type: Optional[str] = None,
):
    """Simple text search across all mock data collections."""
    query = q.lower()
    results = []

    # Search contractors
    if not type or type == "contractor":
        for c in load_mock_data("contractors"):
            if query in json.dumps(c).lower():
                results.append({
                    "id": c["id"],
                    "type": "contractor",
                    "title": c["name"],
                    "description": f"{c['category']} — {c['region']}",
                    "url": f"/registry/contractors/{c['id']}",
                })

    # Search fraud alerts
    if not type or type == "fraud":
        for a in load_mock_data("fraudAlerts"):
            if query in json.dumps(a).lower():
                results.append({
                    "id": a["id"],
                    "type": "fraud_alert",
                    "title": a["title"],
                    "description": a["description"][:100],
                    "url": f"/fraud/alerts/{a['id']}",
                })

    # Search audits
    if not type or type == "audit":
        for a in load_mock_data("audits"):
            if query in json.dumps(a).lower():
                results.append({
                    "id": a["id"],
                    "type": "audit",
                    "title": a["title"],
                    "description": a["description"][:100],
                    "url": f"/audit/audits/{a['id']}",
                })

    # Search reports
    if not type or type == "report":
        for r in load_mock_data("reports"):
            if query in json.dumps(r).lower():
                results.append({
                    "id": r["id"],
                    "type": "report",
                    "title": r["title"],
                    "description": r["description"][:100],
                    "url": f"/reports/{r['id']}",
                })

    return success_response(
        data={"results": results[:10]},
        message="Search results retrieved",
    )


@router.get("/wards")
async def get_wards():
    wards = load_mock_data("wards")
    return success_response(data=wards, message="Wards retrieved")


@router.get("/counties")
async def get_counties():
    counties = load_mock_data("counties")
    return success_response(data=counties, message="Counties retrieved")
