import { openai } from "@/utils/langchain/openai";
import { GoogleSearch } from "@/utils/langchain/plugins/googlesearch";
import { supabaseClient } from "@/utils/langchain/supabase";
import { initializeAgentExecutor } from "langchain/agents";
import { VectorDBQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { BufferMemory } from "langchain/memory";
import { Calculator, ChainTool } from "langchain/tools";
import { SupabaseVectorStore } from "langchain/vectorstores";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question, history } = req.body;

  if (!question) {
    return res.status(400).json({ message: "No question in the request" });
  }

  const model = new ChatOpenAI({ temperature: 0 });

  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll("\n", " ");

  /* create vectorstore */
  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      client: supabaseClient,
    }
  );
  const vectorChain = VectorDBQAChain.fromLLM(openai, vectorStore);

  // Create a chain with the vectorstore and the model
  const vectorDocumentTool = new ChainTool({
    name: "vector-document-tool",
    description:
      "Vector Document Tool - useful for when you need to ask questions about documentation and uploaded files.",
    chain: vectorChain,
  });

  //const tools = [new Calculator(), new GoogleSearch(), vectorDocumentTool];
  const tools = [new GoogleSearch(), vectorDocumentTool, new Calculator()];
  const executor = await initializeAgentExecutor(
    tools,
    model,
    "chat-conversational-react-description",
    true
  );
  executor.memory = new BufferMemory({
    returnMessages: true,
    memoryKey: "chat_history",
    inputKey: "input",
    //chatHistory: new ChatMessageHistory(history),
  });

  try {
    //Ask a question
    console.log("History", history);
    const response = await executor.call({ input: sanitizedQuestion });

    console.log("Response", response);

    // send the response back to the client
    res.status(200).send(JSON.stringify(response));
  } catch (error) {
    console.log("error", error);

    // send a generic error response to the client
    res.status(500).json({ message: "An error occurred" });
  }
}
