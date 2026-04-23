import { Card, Tag, Typography } from "antd";

const { Title } = Typography;

type Props = {
  topics: string[];
  selectedTopic: string | null;
  onSelect: (topic: string) => void;
};

export default function TopicList({ topics, selectedTopic, onSelect }: Props) {
  if (!topics.length) return null;

  return (
    <Card style={{ marginTop: 20 }}>
      <Title level={4}>Choose a Topic</Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {topics.map((topic, index) => (
          <Tag.CheckableTag
            key={index}
            checked={selectedTopic === topic}
            onChange={() => onSelect(topic)}
            style={{ fontSize: 14, padding: "4px 14px", cursor: "pointer" }}
          >
            {topic}
          </Tag.CheckableTag>
        ))}
      </div>
    </Card>
  );
}
