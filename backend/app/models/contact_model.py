from sqlalchemy import Column, String
from app.db.database import Base
import uuid

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    email = Column(String)
    message = Column(String)