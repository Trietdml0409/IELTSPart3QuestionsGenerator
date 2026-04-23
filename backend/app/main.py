from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import topics, questions, answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(topics.router)
app.include_router(questions.router)
app.include_router(answer.router)
