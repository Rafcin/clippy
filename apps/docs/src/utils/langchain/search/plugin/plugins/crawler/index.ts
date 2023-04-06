import { Page } from "puppeteer";
import { Plugin } from "../..";
import { Document } from "langchain/document";
import TurndownService from "turndown";
import { EngineType } from "../../..";
import { splitDocsIntoChunks } from "@/utils/langchain/tools/utils";
import { SupabaseVectorStore } from "langchain/vectorstores";
import { openaiEmbeddings } from "@/utils/langchain/openai";
import { supabaseClient } from "@/utils/langchain/supabase";

type History = {
  [key: string]: string;
};

export class Crawler implements Plugin {
  name: string = "Crawler";
  engine: EngineType = "Crawler";

  async process(data: { page: Page; urls?: string[] | string }): Promise<any> {
    const { page, urls } = data;
    const history: History = {};

    if (!urls) {
      throw new Error("No URLs provided");
    }

    var urls_ = typeof urls === "string" ? [urls] : urls;
    history["searched"] = `Searched: ${
      typeof urls === "string" ? urls_ : urls_.join(", ")
    }`;

    const documents: Document[] = [];
    const turndownService = new TurndownService();

    for (const url of urls_) {
      try {
        await page.goto(url, { waitUntil: "networkidle2" });
        const content = await page.content();
        const title = await page.title();

        history[url] = `Clicked on: ${title} (${url})`;

        const description = await page.$eval('meta[name="description"]', (el) =>
          el.getAttribute("content")
        );
        const image = await page.$eval('meta[property="og:image"]', (el) =>
          el.getAttribute("content")
        );

        const mainContentElement = await page.$(
          "main, article, #content, .content"
        );

        if (mainContentElement) {
          history["readingContent"] = "Reading content";

          const mainContentHTML = await page.evaluate(
            (el) => el.innerHTML,
            mainContentElement
          );

          const markdownContent = turndownService.turndown(mainContentHTML);

          const metadata = {
            title,
            url,
            description,
            image,
            scrapedAt: new Date().toISOString(),
          };

          const document = new Document({
            pageContent: markdownContent,
            metadata,
          });

          documents.push(document);
        }

        // Store the documents in the vector database and create embeddings
        const docs = await splitDocsIntoChunks(documents);

        await SupabaseVectorStore.fromDocuments(docs, openaiEmbeddings, {
          client: supabaseClient,
          tableName: "searches",
          queryName: "match_documents",
        });

        // Query the DB for related documents and return context.
      } catch (error) {
        console.error("Error processing URL:", url, error);
      }
    }

    history["finishedBrowsing"] = "Finished browsing";

    return { documents, history };
  }
}
