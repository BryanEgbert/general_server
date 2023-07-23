import sqlite3

def get_sqlite_connection(env: str):
    if env == "prod":
        conn = sqlite3.connect("./simple_social_media.db")
        return conn
    else:
        conn = sqlite3.connect("./test.db")
        return conn

