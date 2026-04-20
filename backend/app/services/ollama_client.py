import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def call_ollama(prompt: str, model="phi3"):
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": model,
            "prompt": prompt,
            "stream": False
        }
    )
    print(response.status_code)
    print(response.text)

    return response.json()["response"]

