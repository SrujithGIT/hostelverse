from pydantic import BaseModel
from typing import Literal

class MessFeedback(BaseModel):
    student_id: str
    day: str  # e.g., "Tuesday"
    meal_type: Literal["Breakfast", "Lunch", "Snacks", "Dinner"]
    feedback: Literal["Like", "Dislike"]
