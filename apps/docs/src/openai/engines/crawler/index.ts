import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Plugin, InternalHistory } from "./plugin";
import { Document } from "langchain/document";
import { Bard as GoogleBard } from "googlebard";

puppeteer.use(StealthPlugin());

/**
 * Options that can be passed to the Crawler constructor.
 */
interface CrawlerOptions {
  /**
   * An array of plugins to use with the Crawler.
   */
  plugins?: Plugin[];
}

/**
 * Data that has been extracted from a web page by the Crawler.
 */
interface CrawledData {
  /**
   * The URL of the web page that was crawled.
   */
  url: string;

  /**
   * The date and time that the web page was crawled, in ISO 8601 format.
   */
  timestamp: string;

  /**
   * Analysis of the URL by Bard
   */
  analysis?: string;

  /**
   * The extracted data from the web page.
   */
  documents: Document[];
}

/**
 * A web crawler that can be used to extract data from a list of URLs using Puppeteer and a set of plugins.
 */
export class Crawler {
  private plugins: Plugin[];

  /**
   * Creates a new Crawler instance.
   *
   * @param options - An options object that can be used to configure the Crawler.
   *                  The `plugins` property can be used to specify an initial set of plugins to use.
   */
  constructor(options: CrawlerOptions = {}) {
    this.plugins = options.plugins || [];
  }

  /**
   * Adds a new plugin to the Crawler.
   *
   * @param plugin - The plugin to add.
   */
  addPlugin(plugin: Plugin): void {
    this.plugins.push(plugin);
  }

  /**
   * Extracts data from a web page at the specified URL using the configured set of plugins.
   *
   * @param url - The URL of the web page to extract data from.
   * @returns A promise that resolves to a plain JavaScript object containing the extracted data.
   *          The object will have a `url` property set to the input URL and a `timestamp` property set to the current date and time.
   *          If no data could be extracted, the promise will be rejected with an error.
   */
  async getDataFromUrl(url: string): Promise<CrawledData> {
    const BARD_KEY = process.env.BARD_KEY;

    if (!BARD_KEY) {
      throw new Error(
        "BARD_KEY is required. Please set it in the environment."
      );
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    console.log("Page loaded:", url);

    const timestamp = new Date().toISOString();
    const documents: Document[] = [];

    for (const plugin of this.plugins) {
      if (plugin.baseUrl && !url.startsWith(plugin.baseUrl)) {
        console.log("Exempting plugin", plugin.name, "from URL", url);
        continue;
      }

      const pageContent = await plugin.process(page);
      console.log(
        "Plugin",
        plugin.name,
        "extracted",
        pageContent.length,
        "documents from URL",
        url
      );
      //console.log("Page content:", pageContent);

      if (pageContent && pageContent.length > 0) {
        if (plugin.history) {
          const history: InternalHistory = {
            pageUrl: url,
            interactionData: [],
            durationMs: Date.now() - performance.timing.navigationStart,
          };
          Object.assign(history, plugin.history);
          plugin.history = history;
        }
        pageContent.forEach((content: any) => {
          const document = new Document({
            pageContent: content,
            metadata: { pluginName: plugin.name },
          });
          documents.push(document);
        });
      }
    }

    if (documents.length === 0) {
      throw new Error("Failed to extract data from the URL.");
    }

    await browser.close();

    const bot = new GoogleBard(BARD_KEY);
    const query = `Given the following URL, tell me about each of the sections on this page: ${page.url()}}`;
    const analysis = await bot.ask(query);
    console.log("Analysis", analysis);

    return {
      url,
      timestamp,
      analysis,
      documents,
    };
  }
}
