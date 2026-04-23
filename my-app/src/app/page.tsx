"use client";

import { useState } from "react";
import { Button, Layout, Typography, Spin, message } from "antd";
import { getTopics, getQuestions, getAnswer } from "@/app/services/aiService";
import TopicList from "@/app/components/TopicList";
import QuestionList from "@/app/components/QuestionList";
import AnswerBox from "@/app/components/AnswerBox";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Home() {
  //Using use state to set and get for each component
  const [topics, setTopics] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answerData, setAnswerData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  
  const handleGenerateTopics = async () => {
    try {
      //Loading
      setLoading(true);
      //Calling the api for data
      const data = await getTopics();
      //Change the state to display the data
      setTopics(data);
      //Preparing for questions
      setQuestions([]);
    } catch {
      message.error("Failed to load topics");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTopic = async (topic: string) => {
    try {
      //Loading
      setLoading(true);
      //Calling API
      const data = await getQuestions(topic);
      //Change the state to display the data
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
      //Set the state from the data
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
      }}>
        <Title style={{ color: "white", margin: 0 }} level={3}>
          IELTS Part 3 Practice
        </Title>
      </Header>

      <Content style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
        <Button type="primary" onClick={handleGenerateTopics}>
          Generate Topics
        </Button>

        <div style={{ marginTop: 20 }}>
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <TopicList topics={topics} onSelect={handleSelectTopic} />
              <QuestionList questions={questions} onSelect={handleSelectQuestion} />
            </>
          )}
        </div>

        <AnswerBox
          open={!!selectedQuestion}
          question={selectedQuestion}
          answer={answerData?.answer}
          advice={answerData?.advice}
          onClose={() => setSelectedQuestion(null)}
        />
      </Content>
    </Layout>
  );
}