from fastapi import APIRouter, Depends, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated

from api.dependencies import SessionDep
from crud_utils.user_crud import authenticate_user
from core.security import create_jwt_token
from schemas.auth import AuthToken
from core.config import API_V1_PREFIX

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"/{API_V1_PREFIX}/token")

router = APIRouter()


@router.post(path="/token")
def create_auth_token(
    db_session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    """
    Purpose: create an Oauth Bearer Token for  user
    """
    user = authenticate_user(
        db=db_session, email=form_data.username, pwd=form_data.password
    )

    if not user:
        # retrun http 401
        raise HTTPException(status_code=401, detail="User could not be authenticated")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="User is Inactive")

    return AuthToken(access_token=create_jwt_token(user_id=user.id, email=user.email))
