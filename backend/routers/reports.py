"""Reports endpoints — report listing, generation, export."""

from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from services.data_loader import load_mock_data
from utils.response import success_response, paginated_response

router = APIRouter(prefix="/reports", tags=["reports"])


class GenerateReportRequest(BaseModel):
    title: str
    type: str
    category: str
    period: str
    filters: dict = {}
    recipients: list[str] = []


@router.get("")
async def get_reports(
    type: Optional[str] = None,
    category: Optional[str] = None,
    period: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
):
    reports = load_mock_data("reports")

    if type:
        reports = [r for r in reports if r.get("type", "").lower() == type.lower()]

    if category:
        reports = [r for r in reports if r.get("category", "").lower() == category.lower()]

    total = len(reports)
    start = (page - 1) * limit
    end = start + limit

    return paginated_response(
        items=reports[start:end],
        total=total,
        page=page,
        limit=limit,
        items_key="reports",
        message="Reports retrieved",
    )


@router.get("/templates")
async def get_report_templates():
    """Backend team: return actual report templates."""
    return success_response(
        data=[
            {"id": "tpl_001", "name": "Blacklist Summary", "type": "summary", "category": "blacklist"},
            {"id": "tpl_002", "name": "Fraud Monthly", "type": "monthly", "category": "fraud"},
            {"id": "tpl_003", "name": "Compliance Annual", "type": "annual", "category": "compliance"},
        ],
        message="Report templates retrieved",
    )


@router.get("/{report_id}")
async def get_report_details(report_id: str):
    reports = load_mock_data("reports")
    report = next((r for r in reports if r["id"] == report_id), None)

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    return success_response(data=report, message="Report details retrieved")


@router.post("/generate")
async def generate_report(data: GenerateReportRequest):
    """Backend team: implement actual report generation."""
    new_report = {
        "id": f"report_{int(datetime.now(timezone.utc).timestamp())}",
        "title": data.title,
        "description": f"Auto-generated {data.type} report for {data.period}",
        "type": data.type,
        "category": data.category,
        "period": data.period,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "generatedBy": "System",
        "status": "generating",
        "fileUrl": None,
        "size": None,
        "pageCount": None,
        "recipients": data.recipients,
        "accessLevel": "restricted",
    }
    return success_response(data=new_report, message="Report generation started", status_code=201)


@router.get("/{report_id}/export")
async def export_report(report_id: str, format: str = Query("pdf")):
    """Backend team: implement actual file download."""
    reports = load_mock_data("reports")
    report = next((r for r in reports if r["id"] == report_id), None)

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    return success_response(
        data={"reportId": report_id, "format": format, "downloadUrl": report.get("fileUrl")},
        message="Export ready",
    )
