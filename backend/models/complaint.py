from pydantic import BaseModel
from typing import Literal, Optional
from datetime import datetime

class Complaint(BaseModel):
    student_id: str
    room_no: Optional[str] = None
    category: Literal[
        "Electricity Problem",
        "Water Leakage",
        "Bathroom Cleaning",
        "Room Maintenance",
        "Other"
    ]
    description: Optional[str] = None
    status: Optional[str] = "Pending"
    timestamp: Optional[datetime] = datetime.now()
