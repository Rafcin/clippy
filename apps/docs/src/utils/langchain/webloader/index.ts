import {
  CSVLoader,
  JSONLoader,
  JSONLinesLoader,
  PDFLoader,
  TextLoader,
  GithubRepoLoader,
  //PuppeteerWebBaseLoader,
} from "langchain/document_loaders";
import { Document } from "langchain/document";
//import { Page, Browser } from "puppeteer";
import { CheerioWebBaseLoader } from "langchain/document_loaders";

class Scraper {
  constructor() {}

  async loadFromURLs(urls: string[]): Promise<Document[]> {
    try {
      const documents: Document[] = [];

      for (const url of urls) {
        const loader = new CheerioWebBaseLoader(url);
        const content = await loader.load();
        console.log("Content:", content); // Add this line to log the content
        documents.push(...content);
      }
      console.log("Data extracted from urls");
      return documents;
    } catch (error) {
      console.error("Error while processing documents:", error);
      return [];
    }
  }

  async loadFromFiles(
    filePaths: string[],
    fileType: string
  ): Promise<Document[]> {
    const documents: Document[] = [];

    for (const filePath of filePaths) {
      let loader;

      switch (fileType) {
        case "csv":
          loader = new CSVLoader(filePath, "text");
          break;
        case "json":
          loader = new JSONLoader(filePath, "/texts");
          break;
        case "jsonl":
          loader = new JSONLinesLoader(filePath, "/html");
          break;
        case "pdf":
          loader = new PDFLoader(filePath);
          break;
        case "txt":
          loader = new TextLoader(filePath);
          break;
        default:
          throw new Error("Unsupported file type");
      }

      const content = await loader.load();
      documents.push(...content);
    }

    return documents;
  }

  async loadFromGithubURLs(urls: string[]): Promise<Document[]> {
    const documents: Document[] = [];

    for (const url of urls) {
      const loader = new GithubRepoLoader(url, {
        branch: "main",
        recursive: false,
        unknown: "warn",
      });
      const content = await loader.load();
      documents.push(...content);
    }

    return documents;
  }
}

export default Scraper;
