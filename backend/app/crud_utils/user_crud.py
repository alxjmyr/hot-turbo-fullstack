"""
Generic utilities for CRUD operations on Users
"""

from typing import Optional
from sqlmodel import Session

from schemas.db_models import User, UserCreate
from core.security import hash_password


# get user by email
def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """
    Purpose: gets user by email
    """
    return db.query(User).filter(User.email == email).first()


def create_new_user(db: Session, user_in: UserCreate) -> User:
    """
    Purpose: create a new user from UserCreate Object
    """

    new_db_user = User(
        email=user_in.email,
        name=user_in.name,
        hashed_password=hash_password(password=user_in.password),
    )

    db.add(new_db_user)
    db.commit()
    db.refresh(new_db_user)
    return new_db_user
