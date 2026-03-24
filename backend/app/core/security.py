
from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
import os
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# 🔐 PASSWORD HASHING (Render-safe)
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12
)

# 🔑 JWT CONFIG
SECRET_KEY = os.getenv("SECRET_KEY", "yoursecretkey")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 5

# 🔒 Token security scheme
security = HTTPBearer()


# 🔐 HASH PASSWORD
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


# 🔐 VERIFY PASSWORD
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# 🔑 CREATE ACCESS TOKEN
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# 🔍 DECODE TOKEN
def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


# 🔐 GET CURRENT USER FROM TOKEN (VERY IMPORTANT)
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    payload = decode_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    return payload


# 🔐 ROLE-BASED ACCESS (OPTIONAL)
def require_role(required_role: str):
    def role_checker(user=Depends(get_current_user)):
        if user.get("role") != required_role:
            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )
        return user

    return role_checker
