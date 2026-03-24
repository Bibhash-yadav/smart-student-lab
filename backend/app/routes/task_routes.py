from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.task_schema import Task
from app.controllers import task_controller
from app.core.dependencies import get_current_admin
from app.db.database import get_db

router = APIRouter(prefix="/tasks", tags=["Tasks"])


# ✅ CREATE TASK
@router.post("/")
async def create_task(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    service_type: str = Form(...),
    description: str = Form(...),
    deadline: str = Form(...),
    priority: str = Form(...),
    payment_method: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    try:
        data = Task(
            name=name,
            email=email,
            phone=phone,
            service_type=service_type,
            description=description,
            deadline=deadline,
            priority=priority,
            payment_method=payment_method
        )

        return await task_controller.create_task(data, file, db)

    except Exception as e:
        print("CREATE TASK ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to create task")


# ✅ GET TASKS
@router.get("/")
async def get_tasks(
    status: str = None,
    payment: str = None,
    priority: str = None,
    db: Session = Depends(get_db)
):
    try:
        return await task_controller.get_tasks(status, payment, priority, db)
    except Exception as e:
        print("GET TASK ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to fetch tasks")


# ✅ UPDATE TASK (ADMIN)
@router.put("/{task_id}")
async def update_task(
    task_id: str,
    data: dict,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    try:
        return await task_controller.update_task(task_id, data, db)
    except Exception as e:
        print("UPDATE ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to update task")


# ✅ VERIFY PAYMENT
@router.put("/verify-payment/{task_id}")
async def verify_payment(
    task_id: str,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    try:
        return await task_controller.verify_payment(task_id, db)
    except Exception as e:
        print("VERIFY ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Verification failed")


# ✅ DELIVER TASK
@router.put("/deliver/{task_id}")
async def deliver(
    task_id: str,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    try:
        return await task_controller.deliver_task(task_id, db)
    except Exception as e:
        print("DELIVER ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Delivery failed")