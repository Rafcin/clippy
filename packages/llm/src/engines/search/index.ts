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

  isValidUrl(str: string) {
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

  async checkVectorStoreForDocument(document: Document): Promise<boolean> {
    //Setup Pinecone Client
    await this.pineconeClient.init({
      apiKey: this.pineconeAPIKey,
      environment: this.pineconeEnvironmentKey,
    });
    const pineconeIndex = this.pineconeClient.Index(
      this.pineconeIndexKey
    ) as unknown as VectorOperationsApi;
    if (!pineconeIndex) {
      console.log(
        "Pinecone Index not initialized in checkVectorStoreForDocument",
        pineconeIndex,
        this.pineconeClient
      );
      throw new Error(
        "Pinecone Index not initialized in checkVectorStoreForDocument"
      );
    }
    //If all checks passed and Pinecone is setup
    try {
      const store = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: pineconeIndex,
      });
      //Search for exact page content plus include exact metadata url
      const results = await store.similaritySearch(document.pageContent, 1, {
        url: document.metadata?.url,
      });
      //If results are found, return true else false
      return Boolean(results && results.length > 0);
    } catch (error) {
      console.log("Error in checkVectorStoreForDocument", error);
      throw new Error("Error in checkVectorStoreForDocument");
    }
  }

  async search(
    url: string | null,
    query: string
  ): Promise<Document[] | string> {
    try {
      //Setup Pinecone Client
      await this.pineconeClient.init({
        apiKey: this.pineconeAPIKey,
        environment: this.pineconeEnvironmentKey,
      });
      const pineconeIndex = this.pineconeClient.Index(
        this.pineconeIndexKey
      ) as unknown as VectorOperationsApi;
      if (!pineconeIndex) {
        console.log(
          "Pinecone Index not initialized in search",
          pineconeIndex,
          this.pineconeClient
        );
        throw new Error("Pinecone Index not initialized in search");
      }
      const store = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: pineconeIndex,
      });
      if (!store) {
        console.log(
          "Pinecone Store not initialized in search",
          store,
          this.pineconeClient
        );
        throw new Error("Pinecone Store not initialized in search");
      }
      //End Setup Pinecone Client

      //Crawl URL provided and get documents
      if (url) {
        if (typeof url === "string" && this.isValidUrl(url)) {
          const dataFromUrl = await this.crawler.getDataFromUrl(url);
          const documents: Document[] = [];
          //For each document, check if it exists in the vector store
          for (const doc of dataFromUrl.documents) {
            const exists = await this.checkVectorStoreForDocument(doc);
            if (!exists) {
              documents.push(doc);
              console.log("Added new document:", doc);
            }
          }
          //Add new documents to the vector store
          await store.addDocuments(documents);
        } else {
          throw new Error("Could not Crawl URL, please provide a valid URL");
        }
      }

      //Search the vectorstore for the query
      const results = await store.similaritySearch(query);
      if (!results || results.length === 0) {
        return "No results found";
      }
      return results;
    } catch (error) {
      console.log("Error occured in search", error);
      throw new Error(JSON.stringify(error));
    }
  }
}
