from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import jwt

from server.app.db.database import get_database

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Simple dev secret; for production, use env/config
SECRET_KEY = "devsecret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
REFRESH_TOKEN_EXPIRE_DAYS = 30


class SignupRequest(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    confirmPassword: str
    role: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


def get_db():
    return get_database()


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict):
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def _user_response(doc) -> dict:
    return {
        "userId": str(doc.get("_id")),
        "fullName": doc.get("fullName") or doc.get("name") or "",
        "email": doc.get("email"),
        "role": doc.get("role") or "Vendor",
        "isActive": doc.get("isActive", True),
        "createdAt": doc.get("createdAt"),
        "updatedAt": doc.get("updatedAt"),
    }


@router.post("/auth/signup")
async def signup(payload: SignupRequest, db=Depends(get_db)):
    if payload.password != payload.confirmPassword:
        return {"success": False, "message": "Passwords do not match", "data": None}

    existing = await db.users.find_one({"email": payload.email})
    if existing:
        return {"success": False, "message": "Email already registered", "data": None}

    now = datetime.utcnow().isoformat()
    user_doc = {
        "fullName": payload.fullName,
        "email": payload.email,
        "role": payload.role,
        "password": hash_password(payload.password),
        "isActive": True,
        "createdAt": now,
        "updatedAt": now,
    }

    res = await db.users.insert_one(user_doc)
    doc = await db.users.find_one({"_id": res.inserted_id})

    user_out = _user_response(doc)

    return {"success": True, "message": "Account created", "data": user_out}


@router.post("/auth/login")
async def login(payload: LoginRequest, db=Depends(get_db)):
    user = await db.users.find_one({"email": payload.email})
    if not user:
        return {"success": False, "message": "Invalid credentials", "data": None}

    hashed = user.get("password")
    if not hashed or not verify_password(payload.password, hashed):
        return {"success": False, "message": "Invalid credentials", "data": None}

    user_out = _user_response(user)

    token_data = {"sub": str(user.get("_id")), "email": user.get("email")}
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)

    return {
        "success": True,
        "message": "Login successful",
        "data": {
            "accessToken": access_token,
            "refreshToken": refresh_token,
            "user": user_out,
        },
    }
