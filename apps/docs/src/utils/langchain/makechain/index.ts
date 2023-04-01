import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BaseRetriever } from "langchain/dist/schema";
import { openai } from "../openai";

export const makeChain = (vectorstore: BaseRetriever) => {
  return ConversationalRetrievalQAChain.fromLLM(openai, vectorstore, {
    // qaTemplate: qaTemplate,
    // questionGeneratorTemplate: questionGeneratorTemplate,
    returnSourceDocuments: true,
  });
};
