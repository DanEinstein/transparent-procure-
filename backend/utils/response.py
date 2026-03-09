"""
Standard API response wrappers.
All endpoints use these to return consistent response shapes
matching the frontend's API_CONTRACTS.md specification.
"""

from datetime import datetime, timezone
from typing import Any


def success_response(
    data: Any = None,
    message: str = "Success",
    status_code: int = 200,
) -> dict:
    """Wrap data in the standard success envelope."""
    return {
        "success": True,
        "statusCode": status_code,
        "message": message,
        "data": data,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


def error_response(
    message: str = "An error occurred",
    status_code: int = 400,
    errors: list[dict] | None = None,
) -> dict:
    """Wrap an error in the standard error envelope."""
    resp = {
        "success": False,
        "statusCode": status_code,
        "message": message,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    if errors:
        resp["errors"] = errors
    return resp


def paginated_response(
    items: list,
    total: int,
    page: int = 1,
    limit: int = 10,
    items_key: str = "items",
    message: str = "Success",
) -> dict:
    """Wrap a paginated list in the standard envelope with pagination metadata."""
    total_pages = max(1, -(-total // limit))  # ceil division
    return success_response(
        data={
            items_key: items,
            "pagination": {
                "currentPage": page,
                "totalPages": total_pages,
                "totalItems": total,
                "hasNextPage": page < total_pages,
                "hasPrevPage": page > 1,
                "nextPage": page + 1 if page < total_pages else None,
                "prevPage": page - 1 if page > 1 else None,
            },
        },
        message=message,
    )
