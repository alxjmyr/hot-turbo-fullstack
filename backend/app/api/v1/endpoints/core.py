from fastapi import APIRouter

from config import app_logger

router = APIRouter()


@router.get("/hello")
async def api_hello():
    app_logger.info("Hello Endpoint called")
    return {"message": "Hot Turbo Template API"}


@router.get("/health")
async def api_health_check():
    app_logger.info("Running Health Check")
    return {"message": "API is running & healthy"}
