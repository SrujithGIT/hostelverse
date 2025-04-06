import asyncio
from uuid import uuid4
from bson import ObjectId

from database import (
    students_collection,
    rooms_collection,
    outpasses_collection,
    mess_menu_collection,
    mess_feedback_collection,
    complaints_collection,
    alerts_collection,
)

from models.student_model import Student
from models.room_booking import RoomBooking
from models.outpass import Outpass
from models.mess_feedback import MessFeedback
from models.complaint import Complaint
from models.alert import Alert



sample_students = [
    {
        "id": uuid4().hex,
        "name": "Rohit Mathi",
        "age": 21,
        "email": "rohitmathi@example.com",
        "phone_number": "9876543210",
        "address": "123, Jubilee Hills, Hyderabad",
        "branch": "CSE"
    },
    {
        "id": uuid4().hex,
        "name": "Meera Shah",
        "age": 20,
        "email": "meerashah@example.com",
        "phone_number": "9001122233",
        "address": "11, Banjara Hills, Hyderabad",
        "branch": "ECE"
    },
    {
        "id": uuid4().hex,
        "name": "Ishaan Verma",
        "age": 22,
        "email": "ishaanverma@example.com",
        "phone_number": "9988776655",
        "address": "Block 5, Gachibowli Hostel, Hyderabad",
        "branch": "MECH"
    },
    {
        "id": uuid4().hex,
        "name": "Sara Iqbal",
        "age": 21,
        "email": "sara.iqbal@example.com",
        "phone_number": "9876123450",
        "address": "Flat 202, SR Residency, Kondapur",
        "branch": "CIVIL"
    },
    {
        "id": uuid4().hex,
        "name": "Aarav Kumar",
        "age": 19,
        "email": "aaravk@example.com",
        "phone_number": "9123456789",
        "address": "Hostel Block A, Room 204",
        "branch": "IT"
    },
]

async def getStudentsData():
    students = []
    async for student in students_collection.find():
        students.append(Student(**student))
    return students

# Add a student
async def addStudentData(student: Student):
    student_data = student.model_dump(by_alias=True, exclude_unset=True)
    
    # Use custom UUID as _id
    student_data["_id"] = uuid4().hex
    result = await students_collection.insert_one(student_data)

    # Return the inserted student
    student_data["_id"] = str(student_data["_id"])
    return Student(**student_data)


async def book_room(booking: RoomBooking):
    booking_data = booking.model_dump()
    
    # Generate a mock room ID (e.g., based on branch and persons)
    booking_data["room_id"] = f"{booking.branch[:3].upper()}-R{booking.no_of_persons}-{ObjectId()}"
    
    await rooms_collection.insert_one(booking_data)
    return {
        "message": "Room booked successfully",
        "room_id": booking_data["room_id"],
        "details": booking_data
    }


async def request_outpass(outpass: Outpass):
    outpass_data = outpass.model_dump()

    # Basic validation
    if outpass.pass_type == "Late Pass":
        duration = (outpass.to_date - outpass.from_date).days
        if duration > 1:
            return {"error": "Late Pass can only be requested for 1 day"}

    await outpasses_collection.insert_one(outpass_data)
    return {
        "message": f"{outpass.pass_type} requested successfully",
        "details": outpass_data
    }




async def submit_mess_feedback(feedback: MessFeedback):
    feedback_data = feedback.model_dump()
    await mess_feedback_collection.insert_one(feedback_data)
    return {
        "message": f"Feedback submitted for {feedback.day} {feedback.meal_type}",
        "feedback": feedback_data
    }


async def submit_complaint(complaint: Complaint):
    complaint_data = complaint.model_dump()
    await complaints_collection.insert_one(complaint_data)
    return {
        "message": "Complaint submitted successfully",
        "details": complaint_data
    }


async def send_alert(alert: Alert):
    alert_data = alert.model_dump()
    await alerts_collection.insert_one(alert_data)

    # You can trigger a notification to hostel incharge here
    # (e.g., send email/SMS using an external service like Twilio/SMTP)

    return {
        "message": "Alert sent successfully to hostel incharge",
        "alert": alert_data
    }