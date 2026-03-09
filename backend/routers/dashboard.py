"""Dashboard endpoints — aggregated stats and feeds."""

from fastapi import APIRouter
from services.data_loader import load_mock_data
from utils.response import success_response

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/stats")
async def get_stats():
    stats = load_mock_data("dashboardStats")
    return success_response(data=stats, message="Dashboard stats retrieved")


@router.get("/contractor-scores")
async def get_contractor_scores():
    scores = load_mock_data("contractorScores")
    return success_response(data=scores, message="Contractor scores retrieved")


@router.get("/anomalies")
async def get_anomalies():
    anomalies = load_mock_data("priceAnomalies")
    return success_response(data=anomalies, message="Anomalies retrieved")


@router.get("/recent-activities")
async def get_recent_activities():
    """
    Backend team: aggregate recent activities from across the system.
    For now returns an empty list.
    """
    return success_response(data=[], message="Recent activities retrieved")


@router.get("/ward-feed")
async def get_ward_feed():
    feed = load_mock_data("wardFeed")
    return success_response(data=feed, message="Ward feed retrieved")
