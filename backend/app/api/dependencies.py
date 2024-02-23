"""
Fast API dependencies for endpoints
"""

from typing import Generator, Annotated
from sqlmodel import Session
from fastapi import Depends

from db.engine import db_engine


# get db function to return a generator yielding a db session from the db engine
def get_db_session():
    """
    Purpose: gets a db session using engine from db module
    """
    with Session(db_engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db_session)]


# end def


# get current user function to take a JWT validate it and return back a user object if token is valid
