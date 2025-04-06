from pydantic import BaseModel
from datetime import date
from typing import Optional

class Outpass(BaseModel):
    student_id: str
    pass_type: str  # "Late Pass", "Home Pass", or "Emergency Pass"
    reason: str
    from_date: date
    to_date: date
    status: Optional[str] = "Pending"
