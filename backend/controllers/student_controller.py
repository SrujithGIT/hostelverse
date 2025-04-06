from fastapi import APIRouter, HTTPException
from typing import List
from models.student_model import Student
from services.student_service import addStudentData

router = APIRouter()

@router.get("/get-students")
async def getStudents():
    try:
        students = await getStudentsData()
        return {"students": students}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/add-student")
async def addStudent(student: Student):
    try:
        student_data = await addStudentData(student)
        return {"student": student_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
