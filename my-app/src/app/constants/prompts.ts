//- The role: The role that AI need to play
//- The rules: Determine the Output and requirement
//- Example: Example the output

export const TOPIC_PROMPT = `
You are an IELTS Speaking examiner.

Generate exactly 5 IELTS Speaking Part 3 topics, which are usually asked in 2025-2026 

Rules:
- Output MUST be a valid JSON array
- Each topic is short (1–3 words)
- No numbering
- No explanation

Example:
["Education", "Technology", "Environment"]

Now generate:
`;

export const QUESTION_PROMPT = (topic: string) => `
You are an IELTS Speaking examiner.

Generate exactly 5 IELTS Speaking Part 3 questions about: "${topic}"

Rules:
- Output MUST be a valid JSON array
- Each question must be open-ended
- No numbering
- No explanation

Example:
[
  "What are the benefits of education?",
  "How does education influence society?"
]

Now generate:
`;


export const ANSWER_PROMPT = (question: string) => `
You are an IELTS examiner.

For the question: "${question}"

Provide:
1. A Band 9 sample answer 
2. 2-3 key vocabulary words
3. 1 improvement tip

Rules:
- Output MUST be valid JSON
- No extra text

Format:
{
  "answer": "...",
  "vocabulary": ["...", "..."],
  "advice": "..."
}

Now generate:
`;