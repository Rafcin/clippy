import { PuppeteerCrawler } from "crawlee";
import { Document } from "langchain/document";
import cheerio from "cheerio";
import TurndownService from "turndown";

export default class Scraper {
  async loadFromURLs(urls: string[]): Promise<Document[]> {
    console.log("Loading documents from URLs:", urls);
    const documents: Document[] = [];
    const turndownService = new TurndownService();

    const crawler = new PuppeteerCrawler({
      minConcurrency: 10,
      maxConcurrency: 50,
      maxRequestRetries: 1,
      requestHandlerTimeoutSecs: 30,
      maxRequestsPerCrawl: 10,
      async requestHandler({ page, request }) {
        try {
          const url = request.url;
          const content = await page.content();
          const title = await page.title();
          const screenshot = await page.screenshot();

          // Load and parse the content with Cheerio
          const $ = cheerio.load(content);
          // Remove unwanted elements
          $("nav, .skip-content, .navbar, .footer, .ads, .header").remove();

          // Extract relevant content
          const mainContent =
            $("main, article, #content, .content").html() || $("body").html();

          // Convert HTML content to Markdown
          const markdownContent = turndownService.turndown(mainContent || "");

          const metadata = {
            title,
            url,
            screenshot: Buffer.from(screenshot).toString("base64"),
            scrapedAt: new Date().toISOString(),
          };
          console.log("Metadata:", metadata);

          const document = new Document({
            pageContent: markdownContent,
            metadata,
          });
          documents.push(document);
        } catch (error) {
          console.error("Error processing URL:", request.url, error);
        }
      },
      async failedRequestHandler({ request }) {
        console.log("Crawler Failed", {
          url: request.url,
          succeeded: false,
          errors: request.errorMessages,
        });
      },
    });

    await crawler.run(urls);
    console.log("Documents:", documents);
    return documents;
  }
}
