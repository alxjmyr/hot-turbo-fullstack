"""
Security Utils for API
"""

from datetime import datetime, timedelta, UTC
from typing import Any, Union, Optional
from sqlmodel import Session

from jose import jwt
from passlib.context import CryptContext

from datetime import datetime, timedelta

from app.schemas.auth import AuthToken, TokenPayload
from app.schemas.db_models import User

from app.core.config import (
    JWT_AUTH_SECRET,
    JWT_ALGO,
    ACCESS_TOKEN_EXPIRE_DAYS,
    app_logger,
)

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
        "expires_at": expire_at.isoformat(),
        "user_id": user_id,
        "email": email,
    }
    # to_encode = TokenPayload(expires_at=expire_at, user_id=user_id, email=email)
    encoded_jwt = jwt.encode(to_encode, JWT_AUTH_SECRET, algorithm=JWT_ALGO)
    return encoded_jwt


# verify a password reset token
def verify_reset_token(db_session: Session, token: str) -> Optional[User]:
    """verifys a pwd reset token and give back user if valid"""

    try:
        payload = jwt.decode(token, JWT_AUTH_SECRET, algorithms=[JWT_ALGO])
        token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        app_logger.error("Failed to verify password reset token")
        return None

    if datetime.now(UTC) > token_data.expires_at:
        app_logger.info(
            f"Password reset token for user {token_data.user_id} is expired"
        )
        return None

    user = db_session.get(User, token_data.user_id)

    if not user:
        return None
    if not user.is_active:
        return None
    return user
