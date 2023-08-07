from typing import Annotated, List, Optional
from fastapi import FastAPI, Form, status
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
import operator
from contextlib import closing
import sklearn
import sqlite3
import nltk
import dill

from config import Config
from model.post import Post
from model.emotion_predict import EmotionPrediction, EmotionDetails
from utils.db import get_sqlite_connection

cfg = Config()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=cfg.cors_allow_origins,
    allow_credentials=True,
    allow_methods=cfg.cors_allow_methods,
    allow_headers=cfg.cors_allow_headers
)

@app.on_event("startup")
def on_startup():
    nltk.download('wordnet')
    stmt = None
    with closing(get_sqlite_connection(cfg.env)) as conn:
        with closing(conn.cursor()) as cursor:
            if cfg.env == "prod":
                stmt = """
                CREATE TABLE IF NOT EXISTS post(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    post TEXT NOT NULL,
                    polarity TEXT NOT NULL,
                    created_at INTEGER DEFAULT CURRENT_TIMESTAMP)"""
            else:
                cursor.execute("DROP TABLE IF EXISTS post")
                stmt = """
                CREATE TABLE post(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    post TEXT NOT NULL,
                    polarity TEXT NOT NULL,
                    created_at INTEGER DEFAULT CURRENT_TIMESTAMP)"""

            cursor.execute(stmt)
            conn.commit()

@app.get("/post/", response_model=List[Post])
async def get_posts(limit: int = 10, last_id: Optional[int] = None):
    with closing(get_sqlite_connection(cfg.env)) as conn:
        conn.row_factory = sqlite3.Row
        with closing(conn.cursor()) as cursor:
            posts: list[Post | None] = []

            stmt = f"SELECT id, name, post, polarity, created_at FROM post ORDER BY id DESC LIMIT {limit}"
            if last_id != None:
                stmt = f"SELECT id, name, post, polarity, created_at FROM post WHERE id < {last_id} ORDER BY id DESC LIMIT {limit}"

            cursor.execute(stmt)
            data = cursor.fetchall()
            if len(data) <= 0:
                return posts
            
            for post in data:
                p = Post(name=post["name"], post=post["post"], polarity=post["polarity"], created_at=post["created_at"], id=post["id"])
                posts.append(p)
            
            return posts
            
@app.post("/post/", response_model=Post, status_code=status.HTTP_201_CREATED)
async def upload_post(name: Annotated[str, Form()], post: Annotated[str, Form()]):
    with open(file_path,'rb') as io:
        model = dill.load(io)

        polarity = model.predict([post])
        post_model: Post = Post(name=name, post=post, polarity="positive" if polarity[0] == 4 else "negative")

        with closing(get_sqlite_connection(cfg.env)) as conn:
            conn.row_factory = sqlite3.Row
            with closing(conn.cursor()) as cursor:
                posts: list[Post | None] = []
                cursor.execute(
                    "INSERT INTO post (name, post, polarity) VALUES (?, ?, ?) RETURNING id, created_at",
                    (post_model.name, post_model.post, post_model.polarity)
                )

                data = cursor.fetchone()
                post_model.id = data['id']
                post_model.created_at = data['created_at']

                conn.commit()

        return post_model

@app.post("/emotion/", response_model=EmotionPrediction, response_class=ORJSONResponse)
async def get_emotion_prediction(data: list[str]):
    with open("lr_chain_v1.0.joblib",'rb') as io:
        model = dill.load(io)
        results_proba = model.predict_proba(data)
        emotion_details = EmotionDetails(results_proba[0])
        emotion_details_dict = emotion_details.asdict()

        # prediction_model: EmotionPrediction = EmotionPrediction(prediction=emotion_details.asdict(), top_emotions=["test"])
        top_emotions = dict(sorted(emotion_details_dict.items(), key=operator.itemgetter(1), reverse=True))

        return ORJSONResponse({"prediction": emotion_details_dict, "top_emotions": list(top_emotions.keys())})