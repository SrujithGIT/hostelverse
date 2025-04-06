from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.student_routes import router as student_router
from database import client
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Check MongoDB connection
    try:
        await client.admin.command("ping")
        print("✅ MongoDB connection successful")
    except Exception as e:
        print("❌ MongoDB connection failed:", e)
    
    yield  # App is now running

    # Shutdown logic if needed
    client.close()
    print("🛑 MongoDB connection closed")

def create_app():
    app = FastAPI(title="Smart Placements Assistance", lifespan=lifespan)

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routers
    app.include_router(student_router)

    return app
