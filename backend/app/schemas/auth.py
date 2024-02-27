from pydantic import BaseModel, EmailStr
from typing import Union
from schemas.db_models import UserOut


class AuthToken(BaseModel):
    token: str
    token_type: str = "bearer"


class LoginUser(BaseModel):
    email: EmailStr
    password: str


class AuthenticatedUser(BaseModel):
    token: Union[AuthToken | None] = None
    user: Union[UserOut | None] = None
