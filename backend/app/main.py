"""
Root of Hot Turbo Backend API
"""

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from core.config import app_logger, BACKEND_CORS_ORGINS
from api.v1.api import api_router

app = FastAPI()

if BACKEND_CORS_ORGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in BACKEND_CORS_ORGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router)

# @app.get("/api/root")
# async def root():
#     app_logger.info("API Root called")
#


# from fastapi import FastAPI
# from fastapi.routing import APIRoute
# from starlette.middleware.cors import CORSMiddleware

# from app.api.api_v1.api import api_router
# from app.core.config import settings


# def custom_generate_unique_id(route: APIRoute):
#     return f"{route.tags[0]}-{route.name}"


# app = FastAPI(
#     title=settings.PROJECT_NAME,
#     openapi_url=f"{settings.API_V1_STR}/openapi.json",
#     generate_unique_id_function=custom_generate_unique_id,
# )

# # Set all CORS enabled origins
# if settings.BACKEND_CORS_ORIGINS:
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )

# app.include_router(api_router, prefix=settings.API_V1_STR)
