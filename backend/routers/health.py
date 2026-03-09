"""Health check endpoint — the frontend pings this to detect the backend."""

from fastapi import APIRouter
from utils.response import success_response

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check():
    return success_response(
        data={"status": "healthy"},
        message="API is healthy",
    )
