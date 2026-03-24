from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.chat_model import Chat
from app.models.user_model import User

router = APIRouter(prefix="/chat", tags=["Chat"])


# ✅ SEND MESSAGE
@router.post("/")
def send_message(data: dict, db: Session = Depends(get_db)):
    message = data.get("message")
    sender = data.get("sender")
    user_id = data.get("user_id")

    if not message or not sender or not user_id:
        raise HTTPException(status_code=400, detail="Missing fields")

    try:
        msg = Chat(
            message=message,
            sender=sender,
            user_id=user_id,
            seen=False
        )

        db.add(msg)
        db.commit()

        return {"message": "Message sent"}

    except Exception as e:
        print("CHAT ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Chat failed")


# ✅ GET USERS (WITH REAL NAME)
@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    try:
        users = (
            db.query(User.id, User.name)
            .join(Chat, Chat.user_id == User.id)
            .distinct()
            .all()
        )

        return [
            {
                "id": u.id,
                "name": u.name
            }
            for u in users
        ]

    except Exception as e:
        print("USER FETCH ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to fetch users")


# ✅ GET MESSAGES
@router.get("/{user_id}")
def get_messages(user_id: str, db: Session = Depends(get_db)):
    try:
        msgs = db.query(Chat).filter(Chat.user_id == user_id).all()

        # mark seen (blue tick logic)
        for m in msgs:
            if m.sender == "user":
                m.seen = True

        db.commit()

        return [
            {
                "id": m.id,
                "message": m.message,
                "sender": m.sender,
                "seen": m.seen
            }
            for m in msgs
        ]

    except Exception as e:
        print("MSG ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to fetch messages")