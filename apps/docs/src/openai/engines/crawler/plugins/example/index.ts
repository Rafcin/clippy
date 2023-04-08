import { InternalHistory, Plugin } from "../../plugin";
import type { Page } from "puppeteer";

export class ExamplePlugin implements Plugin {
  name = "example";
  history?: InternalHistory;

  async process(page: Page): Promise<Record<string, any> | undefined> {
    this.history = {
      pageUrl: page.url(),
      interactionData: [],
      durationMs: 0,
    };

    // Interact with the page and add interaction data to the history
    const element = await page.$("#example-element");
    if (element) {
      const startTime = Date.now();
      await element.click();
      const endTime = Date.now();
      this.history.interactionData.push({
        selector: "#example-element",
        action: "click",
        timestamp: new Date().toISOString(),
      });
      this.history.durationMs = endTime - startTime;
    }

    // Return data extracted from the page (if any)
    return { exampleData: "example" };
  }
}
