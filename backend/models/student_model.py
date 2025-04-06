# from pydantic import BaseModel
# from typing import Optional, List

# class Student(BaseModel):
#     Id: str
#     name: str
#     age: int
#     email: str
#     password: str
#     parent_mobile_no: str
#     student_mobile_no: str
#     address: str
#     branch:str
#     roll_no:Optional[str] = None
    
#     class Config:
#         from_attributes = True

# from pydantic import BaseModel, Field
# from typing import Optional
# from bson import ObjectId

# class Student(BaseModel):
#     id: Optional[str] = Field(alias="_id")
#     name: str
#     roll_no: str
#     room_no: str
#     branch: Optional[str] = None
#     password: str
#     parent_mobile_no: str
#     student_mobile_no: str

#     class Config:
#         populate_by_name = True  # allows using _id as alias for id
#         arbitrary_types_allowed = True
#         json_encoders = {
#             ObjectId: str
#         }

from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

from pydantic import BaseModel, Field
from typing import Optional

class Student(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    age: int
    email: str
    phone_number: Optional[str]  # 👈 Made optional
    address: str
    branch: str
    roll_no: Optional[str] = None

    class Config:
        populate_by_name = True
        from_attributes = True
        extra = "ignore"


