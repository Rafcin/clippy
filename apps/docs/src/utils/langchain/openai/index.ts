import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAI } from "langchain/llms";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI Credentials");
}

export const openai = new OpenAI({});

export const openaiEmbeddings = new OpenAIEmbeddings();
