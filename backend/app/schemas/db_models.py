from typing import Optional
from sqlmodel import Field, SQLModel

# from pydantic import EmailStr


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    hashed_password: str


# Could do this to create stuff locally w/o alembic
# engine = create_engine(sqlite_url, echo=True)

# SQLModel.metadata.create_all(engine)
