import os

class Config():
    def __init__(self):
        self.env: str = os.getenv("ENV", "dev")
        self.cors_allow_origins: list[str] = os.getenv("CORS_ALLOW_ORIGINS", "*").split()
        self.cors_allow_methods: list[str] = os.getenv("CORS_ALLOW_METHODS", "*").split()
        self.cors_allow_headers: list[str] = os.getenv("CORS_ALLOW_HEADERS", "*").split()
