from fastapi import APIRouter
from app.services.ai_services import generate_answer
from app.schemas.ai import QuestionRequest

router = APIRouter()

@router.post("/answer")
def get_answer(req: QuestionRequest):
    return generate_answer(req.question)