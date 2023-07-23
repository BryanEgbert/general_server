from pydantic import BaseModel
from typing import Optional
from dataclasses import dataclass

class PostRequest(BaseModel):
    name: str
    content: str

@dataclass
class Post():
    name: str
    post: str
    id: Optional[int] = None
    polarity: Optional[str] = None
    created_at: Optional[str] = None