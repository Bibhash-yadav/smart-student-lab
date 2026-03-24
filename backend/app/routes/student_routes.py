from fastapi import APIRouter
from app.controllers.student_controller import student_login

router = APIRouter(prefix="/student", tags=["Student"])

@router.post("/login")
async def login(email: str):
    return await student_login(email)