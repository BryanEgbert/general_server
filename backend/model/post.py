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
    polarity: str
    created_at: str
    id: Optional[int] = None