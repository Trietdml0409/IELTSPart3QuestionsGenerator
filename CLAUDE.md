# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IELTS Part 3 Practice tool: users generate topics, select one to get Part 3 questions, then select a question to receive a model answer and advice. All AI generation goes through Google Gemini.

## Architecture

Full-stack app with two separate services:

- **`backend/`** — FastAPI (Python) serving on `http://localhost:8000`
- **`my-app/`** — Next.js 16 (React 19) frontend, hardcoded to call `http://localhost:8000`

### Backend request flow

```
GET  /topics       → routes/topics.py → ai_services.generate_topics()
POST /questions    → routes/questions.py → ai_services.generate_questions(topic)
POST /answer       → routes/answer.py → ai_services.generate_answer(question)
```

All three routes call `services/gemini_client.py:call_gemini()` which hits the Google Gemini API (`gemini-3-flash-preview`). The API key is hardcoded in `gemini_client.py` — this needs to be moved to an env var. Responses are raw LLM text parsed by `utils/parser.py:safe_parse_json()`, which strips markdown fences and extracts JSON arrays or objects.

Prompts live in `app/core/config.py` (`Settings` class). The `MODEL` field references `llama3` but the actual client uses Gemini — the field is unused.

### Frontend data flow

`page.tsx` owns all state (`topics`, `questions`, `selectedQuestion`, `answerData`). Three UI components receive data and callbacks:
- `TopicList` → click triggers `getQuestions(topic)`
- `QuestionList` → click triggers `getAnswer(question)`
- `AnswerBox` → modal showing `answer` + `advice` from the POST /answer response

API calls are in `src/app/services/aiService.ts`. The base URL is hardcoded to `http://localhost:8000`.

The Next.js config enables the React Compiler (`reactCompiler: true`). Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/` — this project uses Next.js 16 which may differ from training data.

## Commands

### Backend

```bash
# Run from the repo root or backend/ directory
cd backend
python -m uvicorn app.main:app --reload
```

### Frontend

```bash
cd my-app
npm install
npm run dev      # development server
npm run build    # production build
npm run lint     # eslint
```

Both services must be running simultaneously for the app to work.
