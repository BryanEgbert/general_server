from dataclasses import dataclass
from typing import NamedTuple

@dataclass
class EmotionDetails():
    def __init__(self, predit_proba_result: list[float]):
        self.admiration: float = predit_proba_result[0]
        self.amusement: float = predit_proba_result[1]
        self.anger: float = predit_proba_result[2]
        self.annoyance: float = predit_proba_result[3]
        self.approval: float = predit_proba_result[4]
        self.caring: float = predit_proba_result[5]
        self.confusion: float = predit_proba_result[6]
        self.curiosity: float = predit_proba_result[7]
        self.desire: float = predit_proba_result[8]
        self.dissapointment: float = predit_proba_result[9]
        self.disapproval: float = predit_proba_result[10]
        self.disgust: float = predit_proba_result[11]
        self.embarrassment: float = predit_proba_result[12]
        self.excitement: float = predit_proba_result[13]
        self.fear: float = predit_proba_result[14]
        self.gratitude: float = predit_proba_result[15]
        self.grief: float = predit_proba_result[16]
        self.joy: float = predit_proba_result[17]
        self.love: float = predit_proba_result[18]
        self.nervousness: float = predit_proba_result[19]
        self.optimism: float = predit_proba_result[20]
        self.pride: float = predit_proba_result[21]
        self.realization: float = predit_proba_result[22]
        self.relief: float = predit_proba_result[23]
        self.remorse: float = predit_proba_result[24]
        self.sadness: float = predit_proba_result[25]
        self.surprise: float = predit_proba_result[26]
        self.neutral: float = predit_proba_result[27]
    def asdict(self):
        return {
            "admiration": self.admiration,
            "amusement": self.amusement,
            "anger": self.anger,
            "annoyance": self.annoyance,
            "approval": self.approval,
            "caring": self.caring,
            "confusion": self.confusion,
            "curiosity": self.curiosity,
            "desire": self.desire,
            "dissapointment": self.dissapointment,
            "disapproval": self.disapproval,
            "disgust": self.disgust,
            "embarrassment": self.embarrassment,
            "excitement": self.excitement,
            "fear": self.fear,
            "gratitude": self.gratitude,
            "grief": self.grief,
            "joy": self.joy,
            "love": self.love,
            "nervousness": self.nervousness,
            "optimism": self.optimism,
            "pride": self.pride,
            "realization": self.realization,
            "relief": self.relief,
            "remorse": self.remorse,
            "sadness": self.sadness,
            "surprise": self.surprise,
            "neutral": self.neutral
        }
@dataclass
class EmotionPrediction():
    prediction: EmotionDetails
    top_emotions: list[str]
