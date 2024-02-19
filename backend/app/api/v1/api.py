from fastapi import APIRouter

from api.v1.endpoints import core

api_router = APIRouter()

api_router.include_router(core.router, tags=["Core"])
