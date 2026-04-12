from pydantic import BaseModel, EmailStr

class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class VerifySchema(BaseModel):
    email: str
    otp: str