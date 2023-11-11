from dataclasses import dataclass
from typing import NamedTuple

@dataclass
class PetBowlPredictionDetails():
    def __init__(self, predict_result: list[int]):
        self.empty_bowl: int = predict_result[0]
        self.full_bowl: int = predict_result[1]
        self.floor: int = predict_result[2]
        self.unfinished_bowl: int = predict_result[3]

    def asdict(self):
        return {
            "empty_bowl": self.empty_bowl,
            "full_bowl": self.full_bowl,
            "floor": self.floor,
            "unfinished_bowl": self.unfinished_bowl
        }

@dataclass
class PetBowlPrediction():
    prediction: PetBowlPredictionDetails
    top: str