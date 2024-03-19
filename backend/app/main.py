"""
Root of Hot Turbo Backend API
"""

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.core.config import (
    app_logger,
    BACKEND_CORS_ORGINS,
    API_V1_PREFIX,
    PROJECT_NAME,
)
from app.api.v1.api import api_router

app = FastAPI(
    title=PROJECT_NAME,
    openapi_url=f"/{API_V1_PREFIX}/openapi.json",
)

if BACKEND_CORS_ORGINS:
    app_logger.info(f"Allowing CORS from: {BACKEND_CORS_ORGINS}")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=BACKEND_CORS_ORGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=f"/{API_V1_PREFIX}")

if __name__ == "__main__":
    """
    Used for running app in debugger during development. For production usecases
    app should be run via command line using uvicorn or gunicorn for multiple workers
    """
    import uvicorn

    uvicorn.run(app, port=8000)
