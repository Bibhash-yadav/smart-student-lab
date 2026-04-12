from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✅ Database
from app.db.database import Base, engine

# ✅ Import ALL models (IMPORTANT for table creation)
from app.models import user_model, task_model

# ✅ Routes
from app.routes import task_routes
from app.routes import auth_routes
from app.routes import student_routes
from app.routes import analytics_routes


# ✅ Create FastAPI app
app = FastAPI(
    title="Smart Student Lab API",
    version="1.0.0"
)


# ✅ Create tables in Neon (PostgreSQL)
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


# ✅ CORS (React frontend support)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ Include routes
app.include_router(auth_routes.router)
app.include_router(task_routes.router)
app.include_router(student_routes.router)
app.include_router(analytics_routes.router)


# ✅ Health check / root route
@app.get("/")
def home():
    return {
        "message": "🚀 Smart Student Lab Backend Running",
        "status": "OK",
        "version": "1.0.0"
    }

from app.routes import chat_routes

app.include_router(chat_routes.router)

from app.routes import contact_routes

app.include_router(contact_routes.router)

print("🔥 Connected DB:", engine.url)