from app.services.gemini_client import call_gemini
from app.utils.parser import safe_parse_json
from app.core.config import settings


def generate_topics():
    raw = call_gemini(settings.TOPIC_PROMPT)
    return safe_parse_json(raw)


def generate_questions(topic: str):
    prompt = settings.get_question_prompt(topic)
    raw = call_gemini(prompt)
    return safe_parse_json(raw)


def generate_answer(question: str):
    prompt = settings.get_answer_prompt(question)
    raw = call_gemini(prompt)
    return safe_parse_json(raw)
