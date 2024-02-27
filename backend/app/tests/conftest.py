import pytest

from fastapi.testclient import TestClient
from typing import Generator
from sqlmodel import Session

# from backend.app.db.engine import db_engine
from app.main import app


# @pytest.fixture(scope="session")
# def db_session() -> Generator:
#     with Session(db_engine) as session:
#         yield session


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(app) as c:
        yield c
