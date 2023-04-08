import { EngineType } from "@/openai/engines/search";
import { extractLargeBodiesOfText } from "@/openai/engines/search/utils";
import type { Page } from "puppeteer";
import type { Plugin } from "../../..";
import { Bard } from "../bard";

export class BardSearch implements Plugin {
  name: string = "BardSearch";
  engine: EngineType = "Google";

  async process(data: { page: Page; query?: string }): Promise<any> {
    const { page, query } = data;

    if (!query) {
      throw new Error("Query is required to process BardSearch.");
    }

    // Get the first search result
    const firstResult = await page.evaluate(() => {
      const results = Array.from(document.querySelectorAll(".tF2Cxc"));
      const firstResultElement = results[0];

      if (!firstResultElement) {
        return null;
      }

      const title =
        firstResultElement.querySelector("h3.LC20lb")?.textContent || "";
      const link =
        firstResultElement.querySelector(".yuRUbf a")?.getAttribute("href") ||
        "";

      return { title, link };
    });

    if (!firstResult) {
      throw new Error("No search results found.");
    }

    try {
      // Navigate to the first search result's page
      await page.goto(firstResult.link, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });

      // Extract content from the page
      const content = await extractLargeBodiesOfText(page);

      if (!content) {
        throw new Error("Failed to extract content from the page.");
      }

      console.log("Content", content);

      // Truncate content if the total size of the query would exceed 4000 characters
      const maxContentSize = 4000 - query.length - 2; // Subtract 2 for the two newline characters
      const truncatedContent = content.slice(0, maxContentSize);

      // Summarize the content using Bard plugin
      const bard = new Bard();
      const response = await bard.process({
        query: `${query}\n\n${truncatedContent}`,
        page: page,
      });

      return {
        response: {
          ...firstResult,
          summary: response.response,
        },
      };
    } catch (error) {
      console.error("Error processing BardSearch:", error);
      throw error;
    }
  }
}
