import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAI } from "langchain/llms";

export const openai = new OpenAI({
  streaming: true,
});

export const embeddings = new OpenAIEmbeddings();
