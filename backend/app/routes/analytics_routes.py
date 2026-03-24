from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.controllers.analytics_controller import get_stats

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/")
async def stats(db: Session = Depends(get_db)):
    return await get_stats(db)