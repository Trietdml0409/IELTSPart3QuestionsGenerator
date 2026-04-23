#py -m uvicorn app.main:app --reload 

from fastapi import FastAPI
from app.routes import topics, questions, answer

app = FastAPI()

app.include_router(topics.router)
app.include_router(questions.router)
app.include_router(answer.router)

