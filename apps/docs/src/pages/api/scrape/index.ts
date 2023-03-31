import { openaiEmbeddings } from "@/utils/langchain/openai";
import { supabaseClient } from "@/utils/langchain/supabase";
import Scraper from "@/utils/langchain/webloader";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "langchain/vectorstores";
import { NextApiRequest, NextApiResponse } from "next";

async function splitDocsIntoChunks(docs: Document[]): Promise<Document[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  });

  return await splitter.splitDocuments(docs);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  try {
    const urls = req.body.urls; // The list of URLs to scrape
    const filePaths = req.body.filePaths; // The list of file paths to load
    const fileType = req.body.fileType; // The type of files to load

    const scraper = new Scraper();

    let rawDocs: Document[] = [];

    if (urls) {
      rawDocs = await scraper.loadFromURLs(urls);
    }

    if (filePaths) {
      rawDocs = await scraper.loadFromFiles(filePaths, fileType);
    }

    console.log("Raw docs:", rawDocs);

    if (rawDocs.length === 0) {
      throw new Error("Failed to extract data from any of the sources");
    }

    const docs = await splitDocsIntoChunks(rawDocs);

    console.log("Chunks:", docs);

    await SupabaseVectorStore.fromDocuments(docs, openaiEmbeddings, {
      client: supabaseClient,
      tableName: "documents",
      queryName: "match_documents",
    });

    res.status(200).json({ message: "Documents processed successfully" });
  } catch (error) {
    console.error("Error while processing documents:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing documents" });
  }
}
