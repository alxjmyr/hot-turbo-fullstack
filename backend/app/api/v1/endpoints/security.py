from fastapi import APIRouter, Depends, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated, Any


from datetime import timedelta

from app.api.dependencies import SessionDep
from app.crud_utils.user_crud import authenticate_user, get_user_by_email
from app.core.security import create_jwt_token, verify_reset_token, hash_password
from app.schemas.auth import AuthToken, PasswordReset
from app.schemas.messages import Message
from app.core.config import API_V1_PREFIX
from app.core.email_utils import send_password_reset

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"/{API_V1_PREFIX}/token")

router = APIRouter()


@router.post(path="/token")
async def create_auth_token(
    db_session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Any:
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


@router.post(path="/password-reset/{email}", response_model=Message)
async def initiate_password_reset(email: str, db_session: SessionDep) -> Any:
    """
    Purpose:
    """
    user = get_user_by_email(db=db_session, email=email)

    if not user:
        raise HTTPException(
            status_code=400, detail="Email does not match any existing users"
        )
    if not user.is_active:
        raise HTTPException(
            status_code=400, detail="User account with that email is not active"
        )

    reset_token = create_jwt_token(
        user_id=user.id, email=user.email, expires_delta=timedelta(minutes=20)
    )

    send_success = send_password_reset(token=reset_token, email=user.email)

    if send_success:
        return Message(
            context="Password Reset",
            detail="Password reset initiated successfully. Check your email inbox for instructions.",
        )
    else:
        return Message(context="Password Reset", detail="Password Reset Unsuccessful")


@router.post(path="/recover-password", response_model=Message)
async def reset_password(password_reset: PasswordReset, db_session: SessionDep) -> Any:
    token_user = verify_reset_token(db_session=db_session, token=password_reset.token)

    if not token_user:
        raise HTTPException(
            status_code=400,
            detail="Could not verify user. Email does not exist or reset token is expired",
        )

    user = get_user_by_email(db=db_session, email=token_user.email)

    user.hashed_password = hash_password(password_reset.password)
    db_session.commit()
    db_session.refresh(user)

    return Message(
        context="Password Reset",
        detail="Password reset successful. You can login with you new password now.",
    )
