from fastapi.testclient import TestClient
from ..model.post import Post
from datetime import datetime
from ..utils.db import get_sqlite_connection
from contextlib import closing
import json
from ..main import app, cfg
import pytest
# test
fake_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def test_get_post_should_return_empty_array_and_200_code_if_table_is_empty():
    with TestClient(app) as client:
        response = client.get("/post/")

        assert response.status_code == 200
        assert response.json() == []

def test_get_post_should_return_array_of_post_if_table_is_not_empty():
    with TestClient(app) as client:
        post_model_1 = Post(name="test1", post="test_post1", polarity="positive", created_at=fake_time)
        post_model_2 = Post(name="test2", post="test_post2", polarity="negative", created_at=fake_time)

        expected_output = [
            {
                "id": 1,
                "name": "test1",
                "post": "test_post1",
                "polarity": "positive",
                "created_at": fake_time
            },
            {
                "id": 2,
                "name": "test2",
                "post": "test_post2",
                "polarity": "negative",
                "created_at": fake_time
            },
        ]

        fake_data = [
            (post_model_1.name, post_model_1.post, post_model_1.polarity, post_model_1.created_at),
            (post_model_2.name, post_model_2.post, post_model_2.polarity, post_model_2.created_at)
        ]

        with closing(get_sqlite_connection(cfg.env)) as conn:
            with closing(conn.cursor()) as cursor:
                cursor.executemany(
                    "INSERT INTO post (name, post, polarity, created_at) VALUES (?, ?, ?, ?)",
                    fake_data
                )

                conn.commit()

        response = client.get("/post/")

        assert response.status_code == 200
        assert response.json() == expected_output, f"expect: {expected_output}\ngot:{response.json()}"

def test_should_upload_post_with_201_status_code_when_all_required_fields_are_not_empty():
    with TestClient(app) as client:
        response = client.post(
            "/post/", 
            headers={'Content-Type': 'application/x-www-form-urlencoded'}, 
            data={'name': 'test', 'post': 'i am a good guy'})

        assert response.status_code == 201
        assert response.json()['name'] == "test"
        assert response.json()['post'] == "i am a good guy" 
        assert response.json()['polarity'] != None
        assert response.json()['created_at'] != None

def test_should_upload_post_with_400_status_code_when_name_field_is_empty():
    with TestClient(app) as client:
        response = client.post(
            "/post/", 
            # headers={'Content-Type': 'application/x-www-form-urlencoded'}, 
            data={'post': 'i am a good guy'})

        assert response.status_code == 422

def test_should_upload_post_with_400_status_code_when_post_field_is_empty():
    with TestClient(app) as client:
        response = client.post(
            "/post/", 
            headers={'Content-Type': 'application/x-www-form-urlencoded'}, 
            data={'name': 'test'})

        assert response.status_code == 422