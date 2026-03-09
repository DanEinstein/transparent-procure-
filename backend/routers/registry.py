"""Registry endpoints — contractor CRUD and blacklist management."""

from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from services.data_loader import load_mock_data
from utils.response import success_response, error_response, paginated_response

router = APIRouter(prefix="/registry", tags=["registry"])


class CreateContractorRequest(BaseModel):
    name: str
    kraPin: str
    licenseNumber: str
    category: str
    subcategories: list[str] = []
    region: str
    contactPerson: str
    contactEmail: str
    contactPhone: str
    address: str
    financialCapacity: float = 0


class UpdateContractorRequest(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    region: Optional[str] = None
    contactPerson: Optional[str] = None
    contactEmail: Optional[str] = None
    contactPhone: Optional[str] = None
    address: Optional[str] = None
    financialCapacity: Optional[float] = None


class BlacklistRequest(BaseModel):
    reason: str


@router.get("/contractors")
async def get_contractors(
    search: Optional[str] = None,
    category: Optional[str] = None,
    region: Optional[str] = None,
    status: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
):
    contractors = load_mock_data("contractors")

    if search:
        q = search.lower()
        contractors = [
            c for c in contractors
            if q in c.get("name", "").lower()
            or q in c.get("kraPin", "").lower()
        ]

    if category:
        contractors = [c for c in contractors if c.get("category", "").lower() == category.lower()]

    if region:
        contractors = [c for c in contractors if c.get("region", "").lower() == region.lower()]

    if status:
        contractors = [c for c in contractors if c.get("status", "").lower() == status.lower()]

    total = len(contractors)
    start = (page - 1) * limit
    end = start + limit

    return paginated_response(
        items=contractors[start:end],
        total=total,
        page=page,
        limit=limit,
        items_key="contractors",
        message="Contractors retrieved",
    )


@router.get("/contractors/{contractor_id}")
async def get_contractor_details(contractor_id: str):
    contractors = load_mock_data("contractors")
    contractor = next((c for c in contractors if c["id"] == contractor_id), None)

    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")

    return success_response(data=contractor, message="Contractor details retrieved")


@router.post("/contractors")
async def create_contractor(data: CreateContractorRequest):
    """Backend team: save to database."""
    new_contractor = {
        "id": f"contr_{int(datetime.now(timezone.utc).timestamp())}",
        **data.model_dump(),
        "registrationDate": datetime.now(timezone.utc).isoformat(),
        "rating": 0,
        "projectsCompleted": 0,
        "activeProjects": 0,
        "blacklisted": False,
        "blacklistReason": None,
        "complianceScore": 0,
        "lastActivity": datetime.now(timezone.utc).isoformat(),
        "status": "active",
    }
    return success_response(data=new_contractor, message="Contractor created successfully", status_code=201)


@router.put("/contractors/{contractor_id}")
async def update_contractor(contractor_id: str, data: UpdateContractorRequest):
    """Backend team: update in database."""
    contractors = load_mock_data("contractors")
    contractor = next((c for c in contractors if c["id"] == contractor_id), None)

    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")

    updates = data.model_dump(exclude_none=True)
    updated = {**contractor, **updates}
    return success_response(data=updated, message="Contractor updated successfully")


@router.delete("/contractors/{contractor_id}")
async def delete_contractor(contractor_id: str):
    """Backend team: delete from database."""
    contractors = load_mock_data("contractors")
    contractor = next((c for c in contractors if c["id"] == contractor_id), None)

    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")

    return success_response(message="Contractor deleted successfully")


@router.post("/contractors/{contractor_id}/blacklist")
async def blacklist_contractor(contractor_id: str, data: BlacklistRequest):
    """Backend team: update blacklist status in database."""
    contractors = load_mock_data("contractors")
    contractor = next((c for c in contractors if c["id"] == contractor_id), None)

    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")

    contractor["blacklisted"] = True
    contractor["blacklistReason"] = data.reason
    contractor["status"] = "blacklisted"
    return success_response(data=contractor, message="Contractor blacklisted successfully")


@router.get("/blacklisted")
async def get_blacklisted_contractors():
    contractors = load_mock_data("contractors")
    blacklisted = [c for c in contractors if c.get("blacklisted")]
    return success_response(data=blacklisted, message="Blacklisted contractors retrieved")
