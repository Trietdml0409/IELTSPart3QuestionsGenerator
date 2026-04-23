import { Modal, Typography } from "antd";

const { Title, Paragraph } = Typography;

type Props = {
  open: boolean;
  question: string | null;
  answer: string;
  advice: string;
  onClose: () => void;
};

export default function AnswerBox({
  open,
  question,
  answer,
  advice,
  onClose,
}: Props) {
  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <Title level={4}>Question</Title>
      <Paragraph>{question}</Paragraph>

      <Title level={4}>Sample Answer</Title>
      <Paragraph>{answer}</Paragraph>

      <Title level={4}>Advice</Title>
      <Paragraph>{advice}</Paragraph>
    </Modal>
  );
}