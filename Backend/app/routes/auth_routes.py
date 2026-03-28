from fastapi import APIRouter, HTTPException
from app.services.auth_service import register_user, login_user

router = APIRouter()

@router.post("/register")
async def register(user: dict):
    await register_user(user)
    return {"message": "Registered"}

@router.post("/login")
async def login(user: dict):
    token = await login_user(user)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": token}