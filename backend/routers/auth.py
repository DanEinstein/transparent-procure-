"""
Authentication endpoints.
Currently returns mock user data — replace with real JWT auth
when a database is connected.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from services.data_loader import load_mock_data
from utils.response import success_response, error_response

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    userId: str
    password: str


class RegisterRequest(BaseModel):
    userId: str
    email: str
    name: str
    password: str


# In-memory token store (replace with real JWT later)
MOCK_TOKEN = "mock_jwt_token_for_development_purpose_only"


@router.post("/login")
async def login(credentials: LoginRequest):
    """
    Mock login — accepts any non-empty credentials.
    Backend team: replace with real DB lookup + JWT generation.
    """
    if not credentials.userId or not credentials.password:
        return error_response("Invalid credentials", 401)

    user = load_mock_data("user")
    return success_response(
        data={"user": user, "token": MOCK_TOKEN},
        message="Login successful",
    )


@router.post("/logout")
async def logout():
    return success_response(message="Logout successful")


@router.post("/register")
async def register(user_data: RegisterRequest):
    """
    Mock register — returns the submitted data as a new user.
    Backend team: replace with real user creation + DB insert.
    """
    user = load_mock_data("user")
    new_user = {**user, "userId": user_data.userId, "email": user_data.email, "name": user_data.name}
    return success_response(
        data={"user": new_user, "token": MOCK_TOKEN},
        message="Registration successful",
        status_code=201,
    )


@router.post("/refresh")
async def refresh_token():
    return success_response(
        data={"token": MOCK_TOKEN},
        message="Token refreshed",
    )


@router.get("/me")
async def get_current_user():
    """
    Returns the current user profile.
    Backend team: decode JWT from Authorization header to identify user.
    """
    user = load_mock_data("user")
    return success_response(
        data={"user": user},
        message="User data retrieved",
    )
