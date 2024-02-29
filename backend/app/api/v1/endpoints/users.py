from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from app.api.dependencies import SessionDep, CurrentUser, TokenDep

from app.schemas.db_models import User, UserCreate, UserOut
from app.crud_utils.user_crud import (
    get_user_by_email,
    create_new_user,
    authenticate_user,
)
from app.core.security import create_jwt_token
from app.schemas.auth import AuthToken


router = APIRouter()


@router.post(path="/users", response_model=AuthToken)  # need to define response model
def create_user(db_session: SessionDep, user_in: UserCreate) -> Any:
    """
    Purpose:
    """
    # check for user in DB by email
    user = get_user_by_email(db=db_session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists in the system.",
        )

    # create user in db
    user = create_new_user(db=db_session, user_in=user_in)

    # TODO: Auto login new user & send confirmation email from backend
    token = AuthToken(access_token=create_jwt_token(user_id=user.id, email=user.email))
    # return new user in user out obj
    return token


@router.get(path="/users/me", response_model=UserOut)
def get_current_user_info(current_user: CurrentUser) -> Any:
    """gets the current user info based on user token"""
    return current_user
