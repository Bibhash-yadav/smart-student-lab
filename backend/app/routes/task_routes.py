from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, Header
from sqlalchemy.orm import Session

from app.schemas.task_schema import Task
from app.controllers import task_controller
from app.core.dependencies import get_current_admin
from app.core.security import decode_token
from app.db.database import get_db
from app.models.task_model import Task as TaskModel

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


# ✅ GET ALL TASKS (ADMIN)
@router.get("/")
async def get_tasks(
    db: Session = Depends(get_db)
):
    try:
        return db.query(TaskModel).all()
    except Exception as e:
        print("GET TASK ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to fetch tasks")


# ✅ GET MY TASKS (STUDENT) ✅ ONLY ONE VERSION
@router.get("/my-tasks")
async def get_my_tasks(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    if not authorization:
        raise HTTPException(status_code=401, detail="No token provided")

    try:
        token = authorization.split(" ")[1]
        payload = decode_token(token)

        user_email = payload.get("email")

        tasks = db.query(TaskModel).filter(
            TaskModel.email == user_email
        ).all()

        return tasks

    except Exception as e:
        print("MY TASK ERROR:", str(e))
        raise HTTPException(status_code=401, detail="Invalid token")


# ✅ UPDATE TASK (ADMIN) 🔥 IMPORTANT
@router.put("/{task_id}")
async def update_task(
    task_id: str,
    data: dict,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    try:
        task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        # ✅ UPDATE ANY FIELD (status, payment_status, admin_message)
        for key, value in data.items():
            setattr(task, key, value)

        db.commit()
        db.refresh(task)

        return task

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
        task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        task.payment_status = "Verified"

        db.commit()
        db.refresh(task)

        return task

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
        task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        task.status = "Delivered"

        db.commit()
        db.refresh(task)

        return task

    except Exception as e:
        print("DELIVER ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Delivery failed")

from sqlalchemy import text  # ✅ ADD THIS IMPORT

@router.get("/fix-db")
def fix_db(db: Session = Depends(get_db)):
    try:
        db.execute(text("ALTER TABLE tasks ADD COLUMN admin_message TEXT DEFAULT ''"))  # ✅ FIXED
        db.commit()
        return {"message": "✅ Column added successfully"}
    except Exception as e:
        return {"error": str(e)}