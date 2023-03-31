import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAI } from "langchain/llms";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI Credentials");
}

export const openai = new OpenAI({
  temperature: 0,
});

export const openaiStream = new OpenAI({
  temperature: 0,
  streaming: true,
});

export const openaiEmbeddings = new OpenAIEmbeddings();
