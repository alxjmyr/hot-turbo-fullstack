from dotenv import load_dotenv
from os import getenv
import logging

app_logger = logging.getLogger()

logging.basicConfig(
    format="[%(levelname)s:%(asctime)s] %(message)s", level=logging.DEBUG
)
# try to load .env.local file for local dev
# otherwise we will grab configs from env vars set by docker compose
load_dotenv(dotenv_path="../.env.local")

# Get app environment
APP_ENV = getenv("APP_ENV")
app_logger.info(f"Running API in {APP_ENV} mode")

# Frontend info
DOMAIN_FRONTEND = getenv("DOMAIN_FRONTEND")

BACKEND_CORS_ORGINS = [f"{DOMAIN_FRONTEND}"]

# DB Info
POSTGRES_USER = getenv("POSTGRES_USER")
POSTGRES_PASSWORD = getenv("POSTGRES_PASSWORD")
DB_URL = getenv("DB_URL")

# JWT
JWT_AUTH_SECRET = getenv("JWT_AUTH_SECRET")
