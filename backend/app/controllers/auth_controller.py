from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.user_model import User
from app.core.security import hash_password, verify_password, create_access_token


# ✅ REGISTER USER
async def register_user(data, db: Session):
    existing = db.query(User).filter(User.email == data.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        name=data.name,
        email=data.email,
        password=data.password,
        role=data.role
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "User created successfully",
        "user": {
            "id": str(user.id),        # 🔥 IMPORTANT
            "name": user.name,         # 🔥 IMPORTANT
            "email": user.email,
            "role": user.role
        }
    }


# ✅ LOGIN USER
async def login_user(data, db: Session):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid password")

    # 🔥 CREATE TOKEN WITH USER ID
    token = create_access_token({
        "user_id": str(user.id),
        "email": user.email,
        "role": user.role
    })

    return {
        "access_token": token,
        "user": {
            "id": str(user.id),        # 🔥 MUST HAVE
            "name": user.name,         # 🔥 MUST HAVE
            "email": user.email,
            "role": user.role
        }
    }