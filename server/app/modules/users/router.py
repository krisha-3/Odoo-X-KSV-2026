from typing import List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr

from server.app.db.database import get_database

router = APIRouter()


class UserCreate(BaseModel):
    name: str
    email: EmailStr


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr


def get_db():
    return get_database()


def _user_out(doc) -> UserOut:
    return UserOut(id=str(doc.get("_id")), name=doc.get("name"), email=doc.get("email"))


@router.get("/users", response_model=List[UserOut])
async def list_users(db=Depends(get_db)):
    cursor = db.users.find({})
    users = []
    async for doc in cursor:
        users.append(_user_out(doc))
    return users


@router.post("/users", response_model=UserOut)
async def create_user(payload: UserCreate, db=Depends(get_db)):
    existing = await db.users.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    res = await db.users.insert_one(payload.dict())
    doc = await db.users.find_one({"_id": res.inserted_id})
    return _user_out(doc)
