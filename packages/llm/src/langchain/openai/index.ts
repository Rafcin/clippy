import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";

export const openai = new OpenAI({
  streaming: true,
});

export const embeddings = new OpenAIEmbeddings();
