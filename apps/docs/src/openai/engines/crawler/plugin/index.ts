import type { Page } from "puppeteer";

/**
 * A history object that can be used by plugins to keep track of what page was visited,
 * what elements were interacted with, how long it took, and other important data.
 */
export interface InternalHistory {
  pageUrl: string;
  interactionData: {
    selector: string;
    action: string;
    value?: string;
    timestamp: string;
  }[];
  durationMs: number;
}

/**
 * A plugin that can be used by the crawler to extract data from a web page.
 */
export interface Plugin {
  /**
   * The name of the plugin.
   */
  name: string;

  /**
   * The name of the engine or library the plugin is built for (if any).
   */
  engine?: string;

  /**
   * A function that extracts data from a web page using Puppeteer.
   *
   * @param page - The Puppeteer Page object representing the web page to extract data from.
   * @returns A promise that resolves to a plain JavaScript object containing the extracted data.
   *          If no data could be extracted, the promise should resolve to undefined.
   */
  process(page: Page): Promise<Record<string, any> | undefined>;

  /**
   * An optional history object that can be used by the plugin to keep track of what page was visited,
   * what elements were interacted with, how long it took, and other important data.
   */
  history?: InternalHistory;

  /**
   * An optional base URL that the plugin is specific to.
   * If this property is set, the crawler will only use this plugin to extract data from web pages whose URL starts with this base URL.
   */
  baseUrl?: string;
}
