from fastapi import APIRouter
from controllers.student_controller import router as student_controller_router

router = APIRouter()

router.include_router(student_controller_router,prefix="/student",tags=["student"])