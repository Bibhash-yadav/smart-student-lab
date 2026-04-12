from pydantic import BaseModel

class Task(BaseModel):
    name: str
    email: str
    phone: str
    service_type: str
    description: str
    deadline: str
    priority: str
    payment_method: str