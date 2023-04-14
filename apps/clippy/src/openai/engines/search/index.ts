import { Document } from "langchain/document";

import { openaiEmbeddings } from "@/utils/langchain/openai";
import { supabaseClient } from "@/utils/langchain/supabase";
import { SupabaseVectorStore } from "langchain/vectorstores";
import { Crawler } from "../crawler";
import { General } from "../crawler/plugin/plugins/general";
import { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseLibArgs } from "langchain/dist/vectorstores/supabase";

interface SearchOptions {}

export class Search {
  private crawler: Crawler;

  constructor(options: SearchOptions) {
    this.crawler = new Crawler({ plugins: [new General()] });
  }

  validURL(str: string) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  async documentExists(pageContent: string): Promise<boolean> {
    const { data, error } = await supabaseClient
      .from("documents")
      .select("id")
      .eq("content", pageContent)
      .limit(1);

    if (error) {
      console.error("Error checking if document exists:", error);
      throw error;
    }

    console.log("Document exists:", data && data.length > 0);
    return data && data.length > 0;
  }

  async search(
    url: string | null,
    query: string
  ): Promise<Document[] | string> {
    try {
      const store = await SupabaseVectorStore.fromExistingIndex(
        openaiEmbeddings,
        {
          client: supabaseClient as SupabaseClient,
          tableName: "documents",
          queryName: "match_documents",
        } as unknown as SupabaseLibArgs
      );

      if (typeof url === "string" && this.validURL(url)) {
        const data = await this.crawler.getDataFromUrl(url);

        const newDocuments = [];

        for (const doc of data.documents) {
          const exists = await this.documentExists(doc.pageContent);
          if (!exists) {
            newDocuments.push(doc);
            console.log("New document:", doc);
          }
        }

        store.addDocuments(newDocuments);
        console.log("Added documents:", newDocuments.length);
      }

      const results = await store.similaritySearch(query);

      if (results.length === 0 && !url) {
        return "No results found. Please provide a URL to index.";
      }

      return results;
    } catch (error) {
      console.error("Error during crawl and store process:", error);
      throw error;
    }
  }
}
