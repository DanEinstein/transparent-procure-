"""Fraud monitoring endpoints — alerts, patterns, risk assessment."""

from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from services.data_loader import load_mock_data
from utils.response import success_response, paginated_response

router = APIRouter(prefix="/fraud", tags=["fraud"])


class CreateAlertRequest(BaseModel):
    title: str
    description: str
    severity: str
    detectedBy: str
    affectedTenders: list[str] = []
    affectedContractors: list[str] = []
    evidence: list[str] = []


class UpdateAlertRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[str] = None
    assignedTo: Optional[str] = None


class ResolveAlertRequest(BaseModel):
    resolutionNotes: str = ""


@router.get("/alerts")
async def get_alerts(
    severity: Optional[str] = None,
    status: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
):
    alerts = load_mock_data("fraudAlerts")

    if severity:
        alerts = [a for a in alerts if a.get("severity", "").lower() == severity.lower()]

    if status:
        alerts = [a for a in alerts if a.get("status", "").lower() == status.lower()]

    total = len(alerts)
    start = (page - 1) * limit
    end = start + limit

    return paginated_response(
        items=alerts[start:end],
        total=total,
        page=page,
        limit=limit,
        items_key="alerts",
        message="Fraud alerts retrieved",
    )


@router.get("/alerts/{alert_id}")
async def get_alert_details(alert_id: str):
    alerts = load_mock_data("fraudAlerts")
    alert = next((a for a in alerts if a["id"] == alert_id), None)

    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    return success_response(data=alert, message="Alert details retrieved")


@router.post("/alerts")
async def create_alert(data: CreateAlertRequest):
    """Backend team: save to database."""
    new_alert = {
        "id": f"fraud_{int(datetime.now(timezone.utc).timestamp())}",
        **data.model_dump(),
        "status": "open",
        "detectedAt": datetime.now(timezone.utc).isoformat(),
        "assignedTo": None,
        "resolutionNotes": None,
        "resolvedAt": None,
    }
    return success_response(data=new_alert, message="Fraud alert created", status_code=201)


@router.put("/alerts/{alert_id}")
async def update_alert(alert_id: str, data: UpdateAlertRequest):
    """Backend team: update in database."""
    alerts = load_mock_data("fraudAlerts")
    alert = next((a for a in alerts if a["id"] == alert_id), None)

    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    updates = data.model_dump(exclude_none=True)
    updated = {**alert, **updates}
    return success_response(data=updated, message="Alert updated successfully")


@router.patch("/alerts/{alert_id}/resolve")
async def resolve_alert(alert_id: str, data: ResolveAlertRequest = ResolveAlertRequest()):
    """Backend team: update status in database."""
    alerts = load_mock_data("fraudAlerts")
    alert = next((a for a in alerts if a["id"] == alert_id), None)

    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    alert["status"] = "resolved"
    alert["resolutionNotes"] = data.resolutionNotes
    alert["resolvedAt"] = datetime.now(timezone.utc).isoformat()
    return success_response(data=alert, message="Alert resolved successfully")


@router.get("/patterns")
async def get_patterns():
    """Backend team: implement pattern detection logic."""
    return success_response(data=[], message="Fraud patterns retrieved")


@router.get("/risk-assessment/{tender_id}")
async def get_risk_assessment(tender_id: str):
    """Backend team: implement real risk scoring."""
    return success_response(
        data={
            "riskLevel": "medium",
            "score": 65,
            "factors": [
                {"factor": "Bid history", "weight": 30, "impact": "medium"},
                {"factor": "Financial capacity", "weight": 25, "impact": "low"},
                {"factor": "Compliance record", "weight": 45, "impact": "high"},
            ],
            "recommendations": ["Monitor closely", "Verify documentation"],
        },
        message="Risk assessment retrieved",
    )
