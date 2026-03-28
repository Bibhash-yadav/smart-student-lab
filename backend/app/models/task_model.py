from sqlalchemy import Column, String
from app.db.database import Base
import uuid

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    service_type = Column(String)
    description = Column(String)
    deadline = Column(String)
    priority = Column(String)
    status = Column(String, default="Pending")
    payment_status = Column(String, default="Pending")
    admin_message = Column(String, default="")