"""
Generic utilities for CRUD operations on Users
"""

from typing import Optional
from sqlmodel import Session

from app.schemas.db_models import User, UserCreate
from app.core.security import hash_password, verify_password


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


def authenticate_user(db: Session, email: str, pwd: str) -> Optional[User]:
    """
    Purpose: checks for user by email and verifies password
    """

    user = get_user_by_email(db=db, email=email)

    if not user:
        return None

    pwd_verified = verify_password(plain_pwd=pwd, hashed_pwd=user.hashed_password)

    if pwd_verified:
        return user

    return None
