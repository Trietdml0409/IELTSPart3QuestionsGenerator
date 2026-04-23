import { AnswerResponse } from "@/app/types/types/ai";

const BASE_URL = "http://localhost:8000";

export async function getTopics(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/topics`);
  if (!res.ok) throw new Error("Failed to fetch topics");
  const data = await res.json();
  return data.topics;
}

export async function getQuestions(topic: string): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
  if (!res.ok) throw new Error("Failed to fetch questions");
  const data = await res.json();
  return data.questions;
}

export async function getAnswer(question: string): Promise<AnswerResponse> {
  const res = await fetch(`${BASE_URL}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error("Failed to fetch answer");
  return res.json();
}
