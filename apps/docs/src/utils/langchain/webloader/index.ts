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
import { CheerioCrawler, log, LogLevel, PuppeteerCrawler } from "crawlee";

class Scraper {
  constructor() {}

  async extractDocuments(urls: string[]): Promise<Document[]> {
    const documents: Document[] = [];

    const cheerioCrawler = new CheerioCrawler({
      minConcurrency: 10,
      maxConcurrency: 50,
      maxRequestRetries: 1,
      requestHandlerTimeoutSecs: 30,
      maxRequestsPerCrawl: 10,
      async requestHandler({ request, $ }) {
        const pageTitle = $("title").text();
        const pageContent = $("body").text();

        if (!pageContent) {
          throw new Error("Failed to extract data from page using Cheerio");
        }

        const doc = new Document({
          pageContent,
          metadata: { url: request.url, pageTitle, crawler: "cheerio" },
        });

        documents.push(doc);
      },
    });

    const puppeteerCrawler = new PuppeteerCrawler({
      maxConcurrency: 10,
      maxRequestRetries: 1,
      requestHandlerTimeoutSecs: 30,
      maxRequestsPerCrawl: 10,
      async requestHandler({ page, request }) {
        const pageTitle = await page.title();
        const pageContent = await page.content();

        if (!pageContent) {
          throw new Error("Failed to extract data from page using Puppeteer");
        }

        const doc = new Document({
          pageContent,
          metadata: { url: request.url, pageTitle, crawler: "puppeteer" },
        });

        documents.push(doc);
      },
    });

    // Split the URLs into two arrays to be processed by each crawler
    const urls1 = urls.slice(0, urls.length / 2);
    const urls2 = urls.slice(urls.length / 2);

    // Run the crawlers in parallel
    await Promise.all([cheerioCrawler.run(urls1), puppeteerCrawler.run(urls2)]);

    console.log("Extracted Documents:", documents);
    return documents;
  }

  async loadFromURLs(urls: string[]): Promise<Document[]> {
    try {
      const documents = await this.extractDocuments(urls);
      console.log("Data extracted from URLs");
      return documents;
    } catch (error) {
      console.error("Error while processing documents:", error);
      throw error;
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
}

export default Scraper;
