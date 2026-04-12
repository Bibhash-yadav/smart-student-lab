from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# 🔥 IMPORTANT FIX FOR NEON
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,   # ✅ Fix connection drop
    pool_recycle=300      # ✅ Refresh connection
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()