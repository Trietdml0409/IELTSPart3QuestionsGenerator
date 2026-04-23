import json
import re


def safe_parse_json(text: str):
    text = text.strip()

    # Strip markdown code fences
    text = re.sub(r"```json\s*|```\s*", "", text).strip()

    # Try direct parse first
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Extract first JSON array or object
    match = re.search(r"(\[.*?\]|\{.*?\})", text, re.DOTALL)
    if not match:
        raise ValueError(f"No JSON found in response: {text[:200]}")

    try:
        return json.loads(match.group(1))
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse extracted JSON: {e}")
