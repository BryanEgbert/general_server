from typing import Optional
from sqlmodel import Field, SQLModel, Session, create_engine

class Post(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    post: str
    polarity: Optional[str] = None

engine = create_engine("sqlite:///simple_social_media.db")

# class Database()

def init_db_and_table():
    return SQLModel.metadata.create_all(engine)