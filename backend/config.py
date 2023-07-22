import os

class Config():
    def __init__(self):
        self.env: str = os.getenv("ENV", "dev")
