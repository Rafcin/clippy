import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BaseRetriever } from "langchain/dist/schema";
import { openai } from "../openai";
import { qaTemplate, questionGeneratorTemplate } from "../prompts";

export const makeChain = (vectorstore: BaseRetriever) => {
  return ConversationalRetrievalQAChain.fromLLM(openai, vectorstore, {
    qaTemplate: qaTemplate,
    questionGeneratorTemplate: questionGeneratorTemplate,
    returnSourceDocuments: true,
  });
};
