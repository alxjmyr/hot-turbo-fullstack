"""
Security Utils for API
"""

from datetime import datetime, timedelta
from typing import Any, Union

from jose import jwt
from passlib.context import CryptContext

from core.config import JWT_AUTH_SECRET

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
def create_jwt_token():
    """
    Purpose:
    """
    pass


# potentially also a function to verify a provided JWT???
