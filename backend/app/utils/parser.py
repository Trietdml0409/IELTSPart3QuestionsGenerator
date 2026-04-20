import json

def safe_parse_json(text: str):
    try:
        return json.loads(text)
    except:
        # fallback: simple fix
        text = text.strip()
        if text.startswith("```"):
            text = text.split("```")[1]
        return json.loads(text)