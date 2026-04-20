from pydantic import BaseModel

class TopicRequest(BaseModel):
    topic: str

class QuestionRequest(BaseModel):
    question: str