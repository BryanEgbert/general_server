import dill
from .singleton import Singleton
class SentimentModel(metaclass=Singleton):
    def __init__(self, file_path: str):

        with open(file_path,'rb') as io:
            self.model = dill.load(io)