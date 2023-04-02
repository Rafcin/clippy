import { makeChain } from "@/utils/langchain/makechain";
import { supabaseClient } from "@/utils/langchain/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings";
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

  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll("\n", " ");

  /* create vectorstore*/
  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      client: supabaseClient,
    }
  );

  const retriever = vectorStore.asRetriever();

  const chain = makeChain(retriever);

  try {
    //Ask a question
    console.log("History", history);
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history || [],
    });

    console.log("response", response);

    // send the response back to the client
    res.status(200).send(JSON.stringify(response));
  } catch (error) {
    console.log("error", error);

    // send a generic error response to the client
    res.status(500).json({ message: "An error occurred" });
  }
}
