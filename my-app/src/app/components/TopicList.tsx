import { Card, Tag, Typography } from "antd";

const { Title } = Typography;

type Props = {
  topics: string[];
  onSelect: (topic: string) => void;
};

export default function TopicList({ topics, onSelect }: Props) {
  if (!topics.length) return null;

  return (
    <Card style={{ marginTop: 20 }}>
      <Title level={4}>Topics</Title>
      {topics.map((topic, index) => (
        <Tag
          key={index}
          color="blue"
          style={{ marginBottom: 8, cursor: "pointer" }}
          onClick={() => onSelect(topic)}
        >
          {topic}
        </Tag>
      ))}
    </Card>
  );
}