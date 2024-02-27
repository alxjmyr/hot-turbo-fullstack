from pydantic import BaseModel, EmailStr
from typing import Union
from schemas.db_models import UserOut
from datetime import datetime


class AuthToken(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    expires_at: datetime
    user_id: int
    email: str
