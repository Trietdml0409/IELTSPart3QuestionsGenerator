import { Card, List, Typography } from "antd";

const { Title } = Typography;

type Props = {
  questions: string[];
  onSelect: (q: string) => void;
};

export default function QuestionList({ questions, onSelect }: Props) {
  if (!questions.length) return null;

  return (
    <Card style={{ marginTop: 20 }}>
      <Title level={4}>Questions</Title>
      <List
        bordered
        dataSource={questions}
        renderItem={(item) => (
          <List.Item
            onClick={() => onSelect(item)}
            style={{ cursor: "pointer" }}
          >
            {item}
          </List.Item>
        )}
      />
    </Card>
  );
}