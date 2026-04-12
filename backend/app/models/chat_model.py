from sqlalchemy import Column, String, Boolean, ForeignKey
from app.db.database import Base
import uuid

class Chat(Base):
    __tablename__ = "chat"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    message = Column(String)
    sender = Column(String)
    user_id = Column(String, ForeignKey("users.id"))  # 🔥 LINK TO USER
    seen = Column(Boolean, default=False)