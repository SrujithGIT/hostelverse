from pydantic import BaseModel
from datetime import datetime

class Alert(BaseModel):
    student_id: str
    latitude: float
    longitude: float
    timestamp: datetime = datetime.now()
