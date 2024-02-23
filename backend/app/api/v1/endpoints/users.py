from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from api.dependencies import SessionDep

from schemas.db_models import User, UserCreate, UserOut
from crud_utils.user_crud import get_user_by_email, create_new_user


router = APIRouter()


@router.post(
    path="/users/create", response_model=UserOut
)  # need to define response model
def create_user(session: SessionDep, user_in: UserCreate) -> Any:
    """
    Purpose:
    """
    # check for user in DB by email
    user = get_user_by_email(db=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists in the system.",
        )

    # create user in db
    user = create_new_user(db=session, user_in=user_in)

    # TODO: Auto login new user & send confirmation email from backend

    # return new user in user out obj
    return user
