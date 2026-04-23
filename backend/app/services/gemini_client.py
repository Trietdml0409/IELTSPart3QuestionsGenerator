
from google import genai
#py -m uvicorn app.main:app --reload 

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client(api_key="XXX")


def call_gemini(prompt: str, model="models/gemini-1.5-flash-latest"):
    response = client.models.generate_content(
    model="gemini-3-flash-preview", contents=prompt
    )
    # model = genai.GenerativeModel(model)
    # response = model.generate_content(prompt)
    print(response.text)
    return response.text

