import { NextApiRequest, NextApiResponse } from "next";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "langchain/vectorstores";
import { openaiEmbeddings } from "@/utils/langchain/openai";
import { supabaseClient } from "@/utils/langchain/supabase";
import Scraper from "@/utils/scraper";
import cheerio from "cheerio";

async function splitDocsIntoChunks(docs: Document[]): Promise<Document[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  });

  return await splitter.splitDocuments(docs);
}

async function getMetadataFromHtml(html: string, url: string) {
  // Use a library like cheerio to parse the HTML and extract the metadata
  // Here's an example implementation using cheerio:
  const cheerio = require("cheerio");
  const $ = cheerio.load(html);
  const title = $("title").text();
  const description = $('meta[name="description"]').attr("content");
  const image = $('meta[property="og:image"]').attr("content");
  return { title, description, image, url };
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
  console.log("Request body:", req.body, req.body.urls);
  try {
    const urls = req.body.urls;
    const debug = req.body.debug ?? false;
    console.log("URLs:", urls);

    // Check if urls is an array and not empty
    if (!Array.isArray(urls) || urls.length === 0) {
      console.log("No valid URLs provided");
      res.status(400).json({ error: "No valid URLs provided" });
      return;
    }

    // Fetch metadata for each URL in parallel using Promise.all
    const metadata = await Promise.all(
      urls.map(async (url: string) => {
        const response = await fetch(url);
        const html = await response.text();
        const metadata = getMetadataFromHtml(html, url);
        return metadata;
      })
    );

    console.log("Created Scraper");
    const scraper = new Scraper();

    let rawDocs: Document[] = [];

    if (urls) {
      console.log("URLs found, loading loadFromURLs");
      rawDocs = await scraper.loadFromURLs(urls);
      console.log("Loaded documents from URLs:", rawDocs);
    }

    console.log("Raw docs:", rawDocs);

    if (rawDocs.length === 0) {
      throw new Error("Failed to extract data from any of the sources");
    }

    const docs = await splitDocsIntoChunks(rawDocs);

    if (debug === false) {
      await SupabaseVectorStore.fromDocuments(docs, openaiEmbeddings, {
        client: supabaseClient,
        tableName: "documents",
        queryName: "match_documents",
      });
    }

    res.status(200).json({ docs, metadata });
  } catch (error) {
    console.error("Error while processing documents:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing documents" });
  }
}
