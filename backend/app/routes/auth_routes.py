from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.auth_schema import RegisterSchema, LoginSchema
from app.controllers.auth_controller import register_user, login_user, verify_otp

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
async def register(data: RegisterSchema, db: Session = Depends(get_db)):
    return await register_user(data, db)


@router.post("/login")
async def login(data: LoginSchema, db: Session = Depends(get_db)):
    return await login_user(data, db)


# 🔥 NEW ROUTE
@router.post("/verify-otp")
async def verify(data: dict, db: Session = Depends(get_db)):
    return await verify_otp(data, db)