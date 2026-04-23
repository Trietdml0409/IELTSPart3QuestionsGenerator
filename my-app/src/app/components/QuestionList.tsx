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
      <Title level={4}>Select a Question to Practice</Title>
      <List
        bordered
        dataSource={questions}
        renderItem={(item, index) => (
          <List.Item
            onClick={() => onSelect(item)}
            className="question-item"
            style={{ cursor: "pointer" }}
          >
            <span style={{ color: "#1677ff", fontWeight: 600, marginRight: 12, minWidth: 32 }}>
              Q{index + 1}
            </span>
            {item}
          </List.Item>
        )}
      />
    </Card>
  );
}
