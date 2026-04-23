"use client";

import { useState } from "react";
import { Button, Layout, Typography, message, Steps, Spin } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { getTopics, getQuestions, getAnswer } from "@/app/services/aiService";
import { AnswerResponse } from "@/app/types/types/ai";
import TopicList from "@/app/components/TopicList";
import QuestionList from "@/app/components/QuestionList";
import AnswerBox from "@/app/components/AnswerBox";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answerData, setAnswerData] = useState<AnswerResponse | null>(null);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);

  const currentStep = questions.length > 0 ? 2 : topics.length > 0 ? 1 : 0;

  const handleGenerateTopics = async () => {
    try {
      setTopicsLoading(true);
      setTopics([]);
      setQuestions([]);
      setSelectedTopic(null);
      const data = await getTopics();
      setTopics(data);
    } catch {
      message.error("Failed to load topics");
    } finally {
      setTopicsLoading(false);
    }
  };

  const handleSelectTopic = async (topic: string) => {
    try {
      setQuestionsLoading(true);
      setSelectedTopic(topic);
      setQuestions([]);
      const data = await getQuestions(topic);
      setQuestions(data);
    } catch {
      message.error("Failed to load questions");
    } finally {
      setQuestionsLoading(false);
    }
  };

  const handleSelectQuestion = async (question: string) => {
    setSelectedQuestion(question);
    setAnswerData(null);
    try {
      setAnswerLoading(true);
      const data = await getAnswer(question);
      setAnswerData(data);
    } catch {
      message.error("Failed to load answer");
    } finally {
      setAnswerLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Title style={{ color: "white", margin: 0 }} level={3}>
          IELTS Part 3 Practice
        </Title>
      </Header>

      <Content style={{ padding: "40px", maxWidth: 900, margin: "0 auto", width: "100%" }}>
        <Steps
          current={currentStep}
          style={{ marginBottom: 32 }}
          items={[
            { title: "Generate Topics" },
            { title: "Select a Topic" },
            { title: "Pick a Question" },
          ]}
        />

        <Button
          type="primary"
          onClick={handleGenerateTopics}
          loading={topicsLoading}
          disabled={questionsLoading}
          icon={topics.length ? <SyncOutlined /> : undefined}
        >
          {topics.length ? "Regenerate Topics" : "Generate Topics"}
        </Button>

        {!topics.length && !topicsLoading && (
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <Text type="secondary" style={{ fontSize: 15 }}>
              Click &quot;Generate Topics&quot; to start your IELTS Part 3 practice session.
            </Text>
          </div>
        )}

        <TopicList
          topics={topics}
          selectedTopic={selectedTopic}
          onSelect={handleSelectTopic}
        />

        {questionsLoading && (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <Spin tip="Generating questions..." size="large" />
          </div>
        )}

        <QuestionList questions={questions} onSelect={handleSelectQuestion} />

        <AnswerBox
          open={!!selectedQuestion}
          question={selectedQuestion}
          data={answerData}
          loading={answerLoading}
          onClose={() => {
            setSelectedQuestion(null);
            setAnswerData(null);
          }}
        />
      </Content>
    </Layout>
  );
}
