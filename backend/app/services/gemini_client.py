import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai

load_dotenv(Path(__file__).parent.parent / ".env")

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

MODEL = os.getenv("GEMINI_MODEL", "gemini-3-flash-preview")


def call_gemini(prompt: str) -> str:
    response = client.models.generate_content(model=MODEL, contents=prompt)
    return response.text
