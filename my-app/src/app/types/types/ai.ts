//Each types need to have its own id, and then the content

//Topic
export type Topic = {
    id: number;
    text: string;
}

//Question
export type Question = {
  id: number;
  text: string;
};

//AnswerResponse
export type AnswerResponse = {
  answer: string;
  advice: string;
};