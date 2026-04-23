from fastapi import APIRouter
from app.services.ai_services import generate_topics

router = APIRouter()

@router.get("/topics")
def get_topics():
    print("XXX123")
    return {"topics": generate_topics()}