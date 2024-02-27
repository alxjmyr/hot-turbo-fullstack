from fastapi import APIRouter

from app.api.v1.endpoints import core, users, security

# from app.api.v1.endpoints import core

api_router = APIRouter()

api_router.include_router(core.router, tags=["Core"])
api_router.include_router(users.router, tags=["Users"])
api_router.include_router(security.router, tags=["Auth"])
