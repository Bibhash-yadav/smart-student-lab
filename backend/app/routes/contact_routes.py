from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.contact_model import Contact

router = APIRouter(prefix="/contact", tags=["Contact"])


# ✅ SAVE MESSAGE
@router.post("/")
def create_contact(data: dict, db: Session = Depends(get_db)):
    contact = Contact(
        name=data.get("name"),
        email=data.get("email"),
        message=data.get("message")
    )

    db.add(contact)
    db.commit()

    return {"message": "Message sent successfully"}


# ✅ GET ALL (ADMIN)
@router.get("/")
def get_contacts(db: Session = Depends(get_db)):
    contacts = db.query(Contact).all()

    return [
        {
            "id": c.id,
            "name": c.name,
            "email": c.email,
            "message": c.message
        }
        for c in contacts
    ]