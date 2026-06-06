"""Legacy SQLAlchemy model removed. Using MongoDB (Motor) instead.

This file remains for compatibility but is intentionally minimal.
"""

from typing import Optional

from pydantic import BaseModel, EmailStr


class UserSchema(BaseModel):
    id: Optional[str] = None
    name: str
    email: EmailStr
