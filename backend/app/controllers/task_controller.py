from sqlalchemy.orm import Session
from app.models.task_model import Task as TaskModel


# ✅ CREATE TASK
async def create_task(data, file, db: Session):
    task = TaskModel(
        name=data.name,
        email=data.email,
        phone=data.phone,
        service_type=data.service_type,
        description=data.description,
        deadline=data.deadline,
        priority=data.priority,
        status="Pending",
        payment_status="Pending"
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return {
        "message": "Task created successfully",
        "task_id": task.id
    }


# ✅ GET TASKS
async def get_tasks(status=None, payment=None, priority=None, db: Session = None):
    query = db.query(TaskModel)

    if status:
        query = query.filter(TaskModel.status == status)

    if payment:
        query = query.filter(TaskModel.payment_status == payment)

    if priority:
        query = query.filter(TaskModel.priority == priority)

    tasks = query.all()

    return [
        {
            "id": t.id,
            "name": t.name,
            "email": t.email,
            "phone": t.phone,
            "service_type": t.service_type,
            "description": t.description,
            "deadline": t.deadline,
            "priority": t.priority,
            "status": t.status,
            "payment_status": t.payment_status
        }
        for t in tasks
    ]


# ✅ UPDATE TASK STATUS
async def update_task(task_id, data, db: Session):
    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

    if not task:
        return {"error": "Task not found"}

    for key, value in data.items():
        setattr(task, key, value)

    db.commit()

    return {"message": "Task updated successfully"}


# ✅ VERIFY PAYMENT
async def verify_payment(task_id, db: Session):
    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

    if not task:
        return {"error": "Task not found"}

    task.payment_status = "Verified"
    db.commit()

    return {"message": "Payment verified"}


# ✅ DELIVER TASK
async def deliver_task(task_id, db: Session):
    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

    if not task:
        return {"error": "Task not found"}

    task.status = "Delivered"
    db.commit()

    return {"message": "Task delivered successfully"}
    