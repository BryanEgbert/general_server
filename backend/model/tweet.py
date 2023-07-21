from pydantic import BaseModel


class TweetRequest(BaseModel):
    name: str
    content: str