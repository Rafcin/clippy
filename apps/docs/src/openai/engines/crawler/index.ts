import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Plugin, InternalHistory } from "./plugin";

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
   * The extracted data from the web page.
   */
  [key: string]: any;
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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const timestamp = new Date().toISOString();

    let data: Record<string, any> | undefined;
    for (const plugin of this.plugins) {
      if (plugin.baseUrl && !url.startsWith(plugin.baseUrl)) {
        continue;
      }

      data = await plugin.process(page);

      if (data) {
        if (plugin.history) {
          const history: InternalHistory = {
            pageUrl: url,
            interactionData: [],
            durationMs: Date.now() - performance.timing.navigationStart,
          };
          Object.assign(history, plugin.history);
          plugin.history = history;
        }
        break;
      }
    }

    if (!data) {
      throw new Error("Failed to extract data from the URL.");
    }

    data.url = url;
    data.timestamp = timestamp;

    await browser.close();

    return data as CrawledData;
  }
}

/**
 * I am slowly loosing my mind with crawlers, so I have decided to write this class to just cover all the damn cases at this point.
 * If I can figure out how to make it work in a generic way, I will make it a package.
 */
