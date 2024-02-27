"""
Security Utils for API
"""

from datetime import datetime, timedelta, UTC
from typing import Any, Union

from jose import jwt
from passlib.context import CryptContext

from datetime import datetime, timedelta

from app.schemas.auth import AuthToken

from app.core.config import JWT_AUTH_SECRET, JWT_ALGO, ACCESS_TOKEN_EXPIRE_DAYS

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """
    Purpose: takes a password string hashes w/ passlib CryptContext and returns hashed string
    """
    return pwd_context.hash(password)


def verify_password(plain_pwd: str, hashed_pwd: str) -> bool:
    """
    Purpose: Takes plan text pwd and hashed pwd and returns TRUE | FALSE
        if plain and hashed pwd's match
    """
    return pwd_context.verify(plain_pwd, hashed_pwd)


# create new access token w/ jose jwt
def create_jwt_token(user_id: int, email: str, expires_delta: timedelta = None) -> str:
    """
    Purpose:
    """
    if expires_delta:
        expire_at = datetime.now(UTC) + expires_delta
    else:
        expire_at = datetime.now(UTC) + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)

    to_encode = {
        "expires_at": expire_at.strftime("%Y-%m-%d"),
        "user_id": user_id,
        "email": email,
    }
    # to_encode = TokenPayload(expires_at=expire_at, user_id=user_id, email=email)
    encoded_jwt = jwt.encode(to_encode, JWT_AUTH_SECRET, algorithm=JWT_ALGO)
    return encoded_jwt


# potentially also a function to verify a provided JWT???
