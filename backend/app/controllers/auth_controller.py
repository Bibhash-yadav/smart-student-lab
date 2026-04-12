from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime, timedelta
import random

from app.models.user_model import User
from app.core.security import hash_password, verify_password, create_access_token
from app.services.email_service import send_otp_email


# 🔢 Generate 4-digit OTP
def generate_otp():
    return str(random.randint(1000, 9999))


# ================= REGISTER USER =================
async def register_user(data, db: Session):
    existing = db.query(User).filter(User.email == data.email).first()

    # 🔥 CASE 1: USER EXISTS BUT NOT VERIFIED → RESEND OTP
    if existing and not existing.is_verified:
        otp = generate_otp()
        expiry = datetime.utcnow() + timedelta(minutes=10)

        existing.otp_code = otp
        existing.otp_expiry = expiry

        db.commit()

        send_otp_email(existing.email, otp)

        return {
            "message": "OTP resent. Please verify your email 📩"
        }

    # 🔥 CASE 2: USER EXISTS AND VERIFIED → BLOCK
    if existing and existing.is_verified:
        raise HTTPException(
            status_code=400,
            detail="Email already registered. Please login ✅"
        )

    # 🔥 CASE 3: NEW USER → CREATE ACCOUNT
    otp = generate_otp()
    expiry = datetime.utcnow() + timedelta(minutes=10)

    user = User(
        name=data.name,
        email=data.email,
        password=hash_password(data.password),
        role=data.role,
        otp_code=otp,
        otp_expiry=expiry,
        is_verified=False
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    send_otp_email(user.email, otp)

    return {
        "message": "OTP sent to your email 📩"
    }


# ================= VERIFY OTP =================
async def verify_otp(data, db: Session):
    user = db.query(User).filter(User.email == data.get("email")).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found ❌")

    if user.otp_code != data.get("otp"):
        raise HTTPException(status_code=400, detail="Invalid OTP ❌")

    if user.otp_expiry < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired ❌")

    # ✅ VERIFY USER
    user.is_verified = True
    user.otp_code = None
    user.otp_expiry = None

    db.commit()

    return {
        "message": "Email verified successfully ✅"
    }


# ================= LOGIN USER =================
async def login_user(data, db: Session):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found ❌")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid password ❌")

    # 🚫 BLOCK UNVERIFIED USERS
    if not user.is_verified:
        raise HTTPException(
            status_code=403,
            detail="Email not verified ❌ Please verify OTP first"
        )

    # 🔥 CREATE TOKEN
    token = create_access_token({
        "user_id": str(user.id),
        "email": user.email,
        "role": user.role
    })

    return {
        "access_token": token,
        "user": {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }