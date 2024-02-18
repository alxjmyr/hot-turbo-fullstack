"""
Root of Hot Turbo Backend API
"""

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from config import app_logger, BACKEND_CORS_ORGINS

app = FastAPI()

if BACKEND_CORS_ORGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in BACKEND_CORS_ORGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get("/api/root")
async def root():
    app_logger.info("API Root called")
    return {"message": "Hot Turbo Template API"}
