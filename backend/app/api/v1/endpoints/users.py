from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from api.dependencies import SessionDep, CurrentUser, TokenDep

from schemas.db_models import User, UserCreate, UserOut
from crud_utils.user_crud import get_user_by_email, create_new_user, authenticate_user
from core.security import create_jwt_token


router = APIRouter()


@router.post(path="/users", response_model=UserOut)  # need to define response model
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

    # return new user in user out obj
    return user


@router.get(path="/users/me", response_model=UserOut)
def get_current_user_info(current_user: CurrentUser) -> Any:
    """gets the current user info based on user token"""
    return current_user
