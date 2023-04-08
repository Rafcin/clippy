import type { Plugin } from "./plugin";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export type EngineType = "Google" | "Bing" | "DuckDuckGo" | "Crawler";

export interface SESOptions {
  engine?: EngineType;
  plugins?: Plugin[];
}

export class SearchEngineScraper {
  private engine: EngineType;
  private plugins: Plugin[];

  constructor(options: SESOptions = {}) {
    this.engine = options.engine || "Google";
    this.plugins = options.plugins || [];
  }

  setEngine(engine: EngineType): void {
    this.engine = engine;
  }

  addPlugin(plugin: Plugin): void {
    this.plugins.push(plugin);
  }

  async search(query: string): Promise<Record<string, any>> {
    puppeteer.use(StealthPlugin());

    if (this.engine === "Crawler") {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      const processedData: Record<string, any> = {};

      for (const plugin of this.plugins.filter((p) => p.engine === "Crawler")) {
        processedData[plugin.name] = await plugin.process({
          page,
          urls: query,
        });
      }

      await browser.close();
      return processedData;
    }
    if (this.engine === "Google") {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      await page.goto(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`
      );

      // Pass the entire page to the plugins for processing
      const processedData: Record<string, any> = {};

      for (const plugin of this.plugins.filter((p) => p.engine === "Google")) {
        processedData[plugin.name] = await plugin.process({ page, query });
      }

      await browser.close();
      return processedData;
    }

    return {};
  }
}
