import { PineconeClient } from "@pinecone-database/pinecone";
import { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { Document } from "langchain/document";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { embeddings } from "../../langchain/openai";
import { Crawler } from "../crawler";
import { General } from "../crawler/plugin/plugins/general";

interface SearchOptions {
  pineconeIndexKey?: string;
  pineconeAPIKey?: string;
  pineconeEnvironmentKey?: string;
}

export class Search {
  private crawler: Crawler;
  private pineconeIndexKey: string;
  private pineconeAPIKey: string;
  private pineconeEnvironmentKey: string;
  private pineconeClient: PineconeClient;

  constructor(options: SearchOptions) {
    this.pineconeIndexKey =
      options.pineconeIndexKey || process.env.PINECONE_INDEX || "";
    if (!this.pineconeIndexKey) {
      throw new Error("Missing Pinecone Index Key");
    }
    this.pineconeAPIKey =
      options.pineconeAPIKey || process.env.PINECONE_API_KEY || "";
    if (!this.pineconeAPIKey) {
      throw new Error("Missing Pinecone API Key");
    }
    this.pineconeEnvironmentKey =
      options.pineconeEnvironmentKey || process.env.PINECONE_ENVIRONMENT || "";
    if (!this.pineconeEnvironmentKey) {
      throw new Error("Missing Pinecone Environment Key");
    }
    this.pineconeClient = new PineconeClient();
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
    await this.pineconeClient.init({
      apiKey: this.pineconeAPIKey,
      environment: this.pineconeEnvironmentKey,
    });
    const pineconeIndex = this.pineconeClient.Index(
      this.pineconeIndexKey
    ) as unknown as VectorOperationsApi;
    if (!pineconeIndex) {
      console.log(
        "Pinecone Index not initialized",
        pineconeIndex,
        this.pineconeClient
      );
      throw new Error("Pinecone Index not initialized");
    }
    try {
      const store = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: pineconeIndex,
      });
      const results = await store.similaritySearch(pageContent);
      return Boolean(results && results.length > 0);
    } catch (error) {
      console.log("Error in documentExists", error);
      throw new Error("Error in documentExists");
    }
  }

  async search(
    url: string | null,
    query: string
  ): Promise<Document[] | string> {
    try {
      await this.pineconeClient.init({
        apiKey: this.pineconeAPIKey,
        environment: this.pineconeEnvironmentKey,
      });
      const pineconeIndex = this.pineconeClient.Index(
        this.pineconeIndexKey
      ) as unknown as VectorOperationsApi;
      if (!pineconeIndex) {
        console.log(
          "Pinecone Index not initialized",
          pineconeIndex,
          this.pineconeClient
        );
        throw new Error("Pinecone Index not initialized");
      }
      const store = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: pineconeIndex,
      });

      if (typeof url === "string" && this.validURL(url)) {
        const data = await this.crawler.getDataFromUrl(url);

        const newDocuments: Document[] = [];

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
