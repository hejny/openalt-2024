import { OpenAI } from "openai";

export async function useSdkSample() {
  const openai = new OpenAI();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: "What is the Open Source?",
      },
    ],
  });
  console.log(response.choices[0]!.message!.content);
}
