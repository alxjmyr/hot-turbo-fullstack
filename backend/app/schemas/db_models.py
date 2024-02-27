from typing import Union
from sqlmodel import Field, SQLModel, AutoString
from pydantic import EmailStr


# Base shared properties of a user
class UserBase(SQLModel):
    name: str
    email: EmailStr = Field(unique=True, index=True, sa_type=AutoString)
    is_active: bool = True


# Additional properties to get for creation via API
class UserCreate(UserBase):
    password: str


# Properties to return user related API Responses (needs id)
class UserOut(UserBase):
    id: int


# Database model for a User
class User(UserBase, table=True):
    id: Union[int, None] = Field(default=None, primary_key=True)
    hashed_password: str
