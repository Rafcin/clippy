import { ChatOpenAI } from "langchain/chat_models";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAI } from "langchain/llms";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI Credentials");
}

export const openai = new OpenAI({
  streaming: true,
});

export const openaiEmbeddings = new OpenAIEmbeddings();

export const openaiChat = new ChatOpenAI();
