"""Audit endpoints — audit records, trails, exports."""

from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from services.data_loader import load_mock_data
from utils.response import success_response, paginated_response

router = APIRouter(prefix="/audit", tags=["audit"])


class CreateAuditRequest(BaseModel):
    title: str
    description: str
    type: str
    startDate: str
    endDate: str
    assignedTo: list[str] = []
    scope: list[str] = []


class UpdateAuditRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    findings: Optional[list[str]] = None
    recommendations: Optional[list[str]] = None


@router.get("/audits")
async def get_audits(
    type: Optional[str] = None,
    status: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
):
    audits = load_mock_data("audits")

    if type:
        audits = [a for a in audits if a.get("type", "").lower() == type.lower()]

    if status:
        audits = [a for a in audits if a.get("status", "").lower() == status.lower()]

    total = len(audits)
    start = (page - 1) * limit
    end = start + limit

    return paginated_response(
        items=audits[start:end],
        total=total,
        page=page,
        limit=limit,
        items_key="audits",
        message="Audits retrieved",
    )


@router.get("/audits/{audit_id}")
async def get_audit_details(audit_id: str):
    audits = load_mock_data("audits")
    audit = next((a for a in audits if a["id"] == audit_id), None)

    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    return success_response(data=audit, message="Audit details retrieved")


@router.post("/audits")
async def create_audit(data: CreateAuditRequest):
    """Backend team: save to database."""
    new_audit = {
        "id": f"audit_{int(datetime.now(timezone.utc).timestamp())}",
        **data.model_dump(),
        "status": "pending",
        "findings": [],
        "recommendations": [],
        "reportUrl": None,
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "completedAt": None,
    }
    return success_response(data=new_audit, message="Audit created successfully", status_code=201)


@router.put("/audits/{audit_id}")
async def update_audit(audit_id: str, data: UpdateAuditRequest):
    """Backend team: update in database."""
    audits = load_mock_data("audits")
    audit = next((a for a in audits if a["id"] == audit_id), None)

    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    updates = data.model_dump(exclude_none=True)
    updated = {**audit, **updates}
    return success_response(data=updated, message="Audit updated successfully")


@router.get("/trail/{entity_type}/{entity_id}")
async def get_audit_trail(entity_type: str, entity_id: str):
    """Backend team: implement audit trail tracking."""
    return success_response(
        data=[],
        message=f"Audit trail for {entity_type}/{entity_id} retrieved",
    )


@router.get("/export")
async def export_audit_report(
    format: str = Query("pdf"),
    type: Optional[str] = None,
    status: Optional[str] = None,
):
    """Backend team: implement actual report file generation."""
    return success_response(
        data={"downloadUrl": None, "format": format},
        message="Export endpoint ready — implement file generation",
    )
