from sqlalchemy.orm import Session
from app.models.task_model import Task


# 📊 GET ANALYTICS STATS
async def get_stats(db: Session):
    total_tasks = db.query(Task).count()

    completed = db.query(Task).filter(Task.status == "Completed").count()
    pending = db.query(Task).filter(Task.status == "Pending").count()

    paid = db.query(Task).filter(Task.payment_status == "Verified").count()
    unpaid = db.query(Task).filter(Task.payment_status == "Pending").count()

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed,
        "pending_tasks": pending,
        "paid_tasks": paid,
        "unpaid_tasks": unpaid
    }