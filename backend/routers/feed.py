"""Feed endpoints — ward-level community posts."""

from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Query
from pydantic import BaseModel
from services.data_loader import load_mock_data
from utils.response import success_response, paginated_response

router = APIRouter(prefix="/feed", tags=["feed"])


class GeoTag(BaseModel):
    lat: float
    lng: float
    location: str


class CreatePostRequest(BaseModel):
    ward: str
    title: str
    content: str
    images: list[str] = []
    status: str = "on_schedule"
    geoTag: Optional[GeoTag] = None


@router.get("/ward/{ward_id}")
async def get_ward_feed(ward_id: str):
    posts = load_mock_data("feedPosts")
    filtered = [p for p in posts if ward_id.lower() in p.get("ward", "").lower()]
    return success_response(data=filtered, message="Ward feed retrieved")


@router.get("/posts")
async def get_posts(
    wardId: Optional[str] = None,
    category: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
):
    posts = load_mock_data("feedPosts")

    if wardId:
        posts = [p for p in posts if p.get("ward") == wardId]

    total = len(posts)
    start = (page - 1) * limit
    end = start + limit

    return paginated_response(
        items=posts[start:end],
        total=total,
        page=page,
        limit=limit,
        items_key="posts",
        message="Feed posts retrieved",
    )


@router.post("/posts")
async def create_post(post_data: CreatePostRequest):
    """
    Backend team: save to database and return the created post.
    """
    user = load_mock_data("user")
    new_post = {
        "id": f"post_{int(datetime.now(timezone.utc).timestamp())}",
        "author": {"id": user["id"], "name": user["name"], "avatar": "", "verified": True},
        "ward": post_data.ward,
        "title": post_data.title,
        "content": post_data.content,
        "images": post_data.images,
        "status": post_data.status,
        "likes": 0,
        "comments": 0,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "referenceId": None,
        "geoTag": post_data.geoTag.model_dump() if post_data.geoTag else None,
    }
    return success_response(data=new_post, message="Post created successfully", status_code=201)
