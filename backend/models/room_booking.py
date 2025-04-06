from pydantic import BaseModel
from typing import Optional

class RoomBooking(BaseModel):
    student_id: str
    no_of_persons: int
    branch: str
    room_id: Optional[str] = None