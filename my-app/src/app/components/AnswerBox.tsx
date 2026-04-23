import { Modal, Tag, Typography, Spin } from "antd";
import { AnswerResponse } from "@/app/types/types/ai";

const { Title, Paragraph } = Typography;

type Props = {
  open: boolean;
  question: string | null;
  data: AnswerResponse | null;
  loading: boolean;
  onClose: () => void;
};

export default function AnswerBox({ open, question, data, loading, onClose }: Props) {
  return (
    <Modal open={open} onCancel={onClose} footer={null} width={680}>
      <Title level={4}>Question</Title>
      <Paragraph style={{ fontSize: 15 }}>{question}</Paragraph>

      {loading ? (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <Spin tip="Generating answer..." size="large" />
        </div>
      ) : (
        <>
          <Title level={4}>Sample Answer</Title>
          <Paragraph>{data?.answer}</Paragraph>

          {data?.vocabulary?.length ? (
            <>
              <Title level={4}>Key Vocabulary</Title>
              <div style={{ marginBottom: 16 }}>
                {data.vocabulary.map((word) => (
                  <Tag key={word} color="green" style={{ marginBottom: 4 }}>
                    {word}
                  </Tag>
                ))}
              </div>
            </>
          ) : null}

          <Title level={4}>Advice</Title>
          <Paragraph>{data?.advice}</Paragraph>
        </>
      )}
    </Modal>
  );
}
