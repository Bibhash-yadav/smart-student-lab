from app.core.security import create_access_token

# simple login (no password, based on email)
async def student_login(email: str):
    token = create_access_token({
        "email": email,
        "role": "student"
    })

    return {
        "access_token": token,
        "role": "student"
    }