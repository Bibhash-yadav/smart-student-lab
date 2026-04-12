async def verify_payment(task_id, db):
    task = db.query(Task).filter(Task.id == task_id).first()

    task.payment_status = "Verified"
    db.commit()

    return {"message": "Payment verified"}