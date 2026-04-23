const BASE_URL = "http://localhost:8000"; // FastAPI later



//This is the getting topics function
//Call API for generating topic
export async function getTopics(): Promise<string[]> {
  //Fetch: make a network request to api
  //Await: Pauses the function until the request finish
  const res = await fetch(`${BASE_URL}/topics`);

  //Throwing errors by checking if response is ok or not
  if (!res.ok) {
    throw new Error("Failed to fetch topics");
  }

  //return the data
  const data = await res.json();
  return data.topics; // expected format from FastAPI
}


//This is getting question function
//Passing the topic as parameter
export async function getQuestions(topic: string): Promise<string[]> {
  //POST METHOD sending data to the server
  //header: tell the server it is sending json
  //body: the actual data send to the server
  const res = await fetch(`${BASE_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  //Error notification
  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  //return the data
  const data = await res.json();
  return data.questions;
}


//Here is getting the Answer function
//Passing the question as parameter
export async function getAnswer(question: string) {
  //POST METHOD sending data to the server
  //header: tell the server it is sending json
  //body: the actual data send to the server
  const res = await fetch(`${BASE_URL}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  //If there is error
  if (!res.ok) {
    throw new Error("Failed to fetch answer");
  }

  return res.json(); // { answer, advice }
}