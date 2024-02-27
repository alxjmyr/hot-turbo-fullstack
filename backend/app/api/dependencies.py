"""
Fast API dependencies for endpoints
"""

from typing import Generator, Annotated
from sqlmodel import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError

from db.engine import db_engine
from core.config import API_V1_PREFIX, JWT_AUTH_SECRET, JWT_ALGO
from schemas.db_models import User
from schemas.auth import TokenPayload


# get db function to return a generator yielding a db session from the db engine
def get_db_session():
    """
    Purpose: gets a db session using engine from db module
    """
    with Session(db_engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db_session)]

# oauth2_token_dep = OAuth2PasswordBearer(tokenUrl=f"{API_V1_PREFIX}/token")

reusable_oauth2 = OAuth2PasswordBearer(tokenUrl=f"/{API_V1_PREFIX}/token")
# print(f"/{API_V1_PREFIX}/token")

TokenDep = Annotated[str, Depends(reusable_oauth2)]


# get current user function to take a JWT validate it and return back a user object if token is valid
def get_current_user(db_session: SessionDep, token: TokenDep) -> User:
    """
    Purpose: decode token and check that user is valid
    """

    try:
        test = token
        payload = jwt.decode(token, JWT_AUTH_SECRET, algorithms=[JWT_ALGO])
        token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unable to validate credentials",
        )

    user = db_session.get(User, token_data.user_id)

    if not user:
        raise HTTPException(status=status.HTTP_404_NOT_FOUND, detail="User not found")
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="The User is inactive"
        )
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
