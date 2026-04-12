from sqlalchemy import Column, String, Boolean, DateTime
from app.db.database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String)

    # 🔥 NEW FIELDS
    otp_code = Column(String, nullable=True)
    otp_expiry = Column(DateTime, nullable=True)
    is_verified = Column(Boolean, default=False)