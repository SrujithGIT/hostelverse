import motor.motor_asyncio
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Get Mongo URI from .env
MONGO_DETAILS = os.getenv("MONGO_URL")

# Connect to MongoDB Atlas
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

# Connect to the specific database
database = client.HostelDB

students_collection = database.get_collection("students")
outpasses_collection = database.get_collection("outpasses")
visitors_collection = database.get_collection("visitors")
wardens_collection = database.get_collection("wardens")
admins_collection = database.get_collection("admins")
rooms_collection = database.get_collection("rooms")
attendance_collection = database.get_collection("attendance")
# leaves_collection = database.get_collection("leave_requests")
complaints_collection = database.get_collection("complaints")
payments_collection = database.get_collection("payments")
mess_menu_collection = database.get_collection("mess_menu")
mess_feedback_collection = database.get_collection("mess_feedback")
alerts_collection = database.get_collection("alerts")
