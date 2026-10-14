import Groq from "groq-sdk";
import { APIError } from "../utils/apiError.js";

let groq;

const getGroq = () => {
  if (!groq) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not defined in environment variables");
    }
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groq;
};

const callAI = async (messages) => {
  try {
    const groqInstance = getGroq();
    const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

    const chatCompletion = await groqInstance.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        ...messages,
      ],
      model,
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("AI Service Error:", error);
    const errorMessage =
      error?.error?.message || error?.message || "Unknown AI error";
    throw new APIError(500, `Failed to call AI API: ${errorMessage}`, [
      errorMessage,
    ]);
  }
};

export { callAI };

