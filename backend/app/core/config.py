class Settings:
    MODEL = "llama3"

    TOPIC_PROMPT = """
Generate 5 IELTS Part 3 topics as JSON array.
"""

    def get_question_prompt(self, topic):
        return f"""
Generate 5 IELTS Part 3 questions about {topic} as JSON array.
"""

    def get_answer_prompt(self, question):
        return f"""
Return JSON:
{{"answer": "...", "advice": "..."}}

Question: {question}
"""

settings = Settings()