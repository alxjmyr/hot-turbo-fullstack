from sqlmodel import create_engine

from core.config import SQLALCHEMY_DATABASE_URI

db_engine = create_engine(SQLALCHEMY_DATABASE_URI)
