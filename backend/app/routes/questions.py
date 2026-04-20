from fastapi import APIRouter
from app.services.ai_services import generate_questions
from app.schemas.ai import TopicRequest

router = APIRouter()

@router.post("/questions")
def get_questions(req: TopicRequest):
    return {"questions": generate_questions(req.topic)}