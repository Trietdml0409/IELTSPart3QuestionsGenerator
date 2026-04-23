class Settings:
    TOPIC_PROMPT = """
You are an IELTS Speaking examiner.

Generate exactly 5 IELTS Speaking Part 3 topics commonly asked in 2025-2026.

Rules:
- Output MUST be a valid JSON array of strings
- Each topic is short (1-3 words)
- No numbering, no explanation

Example:
["Education", "Technology", "Environment", "Health", "Media"]

Now generate:
"""

    def get_question_prompt(self, topic: str) -> str:
        return f"""
You are an IELTS Speaking examiner.

Generate exactly 5 IELTS Speaking Part 3 questions about: "{topic}"

Rules:
- Output MUST be a valid JSON array of strings
- Each question must be open-ended
- No numbering, no explanation

Example:
["What are the benefits of education?", "How does education influence society?"]

Now generate:
"""

    def get_answer_prompt(self, question: str) -> str:
        return f"""
You are an IELTS examiner.

For this question: "{question}"

Provide:
1. A Band 9 sample answer (3-4 sentences)
2. 2-3 key vocabulary words used
3. One specific improvement tip for lower-band students

Rules:
- Output MUST be valid JSON with no extra text
- Use double quotes only

Format:
{{
  "answer": "...",
  "vocabulary": ["word1", "word2"],
  "advice": "..."
}}

Now generate:
"""


settings = Settings()
