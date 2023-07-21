from typing import Annotated, List
from fastapi import FastAPI, Form
from sqlmodel import Session, select
from db.db import engine, init_db_and_table, Post
from utils.sentiment_model import SentimentModel
import sklearn

app = FastAPI()
sentiment_model = SentimentModel('rf_v1.2_dill.joblib')

@app.on_event("startup")
def on_startup():
    init_db_and_table()

@app.get("/post/", response_model=List[Post])
async def getPosts():
    with Session(engine) as session:
        post = session.exec(select(Post)).all()

        return post

@app.post("/post/")
async def uploadPost(name: Annotated[str, Form()], post: Annotated[str, Form()]):
    polarity = sentiment_model.model.predict([post])
    post_model = Post(name=name, post=post, polarity="positive" if polarity[0] == 4 else "negative")

    with Session(engine) as session:
        session.add(post_model)
        session.commit()
        session.refresh(post_model)

        return post_model