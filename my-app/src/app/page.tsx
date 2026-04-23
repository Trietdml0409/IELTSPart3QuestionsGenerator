"use client";

import { useState } from "react";
import { Button, Layout, Typography, Spin, message } from "antd";
import { getTopics, getQuestions, getAnswer } from "@/app/services/aiService";
import { AnswerResponse } from "@/app/types/types/ai";
import TopicList from "@/app/components/TopicList";
import QuestionList from "@/app/components/QuestionList";
import AnswerBox from "@/app/components/AnswerBox";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [topics, setTopics] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answerData, setAnswerData] = useState<AnswerResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateTopics = async () => {
    try {
      setLoading(true);
      const data = await getTopics();
      setTopics(data);
      setQuestions([]);
    } catch {
      message.error("Failed to load topics");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTopic = async (topic: string) => {
    try {
      setLoading(true);
      const data = await getQuestions(topic);
      setQuestions(data);
    } catch {
      message.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectQuestion = async (question: string) => {
    try {
      setLoading(true);
      const data = await getAnswer(question);
      setAnswerData(data);
      setSelectedQuestion(question);
    } catch {
      message.error("Failed to load answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title style={{ color: "white", margin: 0 }} level={3}>
          IELTS Part 3 Practice
        </Title>
      </Header>

      <Content style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
        <Button type="primary" onClick={handleGenerateTopics} loading={loading}>
          Generate Topics
        </Button>

        <div style={{ marginTop: 20 }}>
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <TopicList topics={topics} onSelect={handleSelectTopic} />
              <QuestionList
                questions={questions}
                onSelect={handleSelectQuestion}
              />
            </>
          )}
        </div>

        <AnswerBox
          open={!!selectedQuestion}
          question={selectedQuestion}
          data={answerData}
          onClose={() => {
            setSelectedQuestion(null);
            setAnswerData(null);
          }}
        />
      </Content>
    </Layout>
  );
}
