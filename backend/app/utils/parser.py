import json
import re

def safe_parse_json(text: str):
    try:
        return json.loads(text)
    except:
        # Step 1: remove markdown code blocks
        text = re.sub(r"```json|```", "", text).strip()

        # Step 2: extract JSON array or object
        match = re.search(r"(\[.*\]|\{.*\})", text, re.DOTALL)
        if match:
            cleaned = match.group(1)
        else:
            raise ValueError(f"No JSON found in: {text}")

        # Step 3: fix common issues
        cleaned = cleaned.replace("'", '"')
        return json.loads(cleaned)