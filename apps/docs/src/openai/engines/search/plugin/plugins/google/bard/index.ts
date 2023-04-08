import { EngineType } from "@/openai/engines/search";
import { Bard as GoogleBard } from "googlebard";
import { Page } from "puppeteer";
import type { Plugin } from "../../..";

export class Bard implements Plugin {
  name: string = "Bard";
  engine: EngineType = "Google";

  async process(data: { page: Page; query?: string }): Promise<any> {
    const { page, query } = data;

    if (!query) {
      throw new Error("Query is required to process Bard.");
    }

    const bardKey = process.env.BARD_KEY;

    if (!bardKey) {
      throw new Error(
        "BARD_KEY is required. Please set it in the environment."
      );
    }

    try {
      let bot = new GoogleBard(bardKey);
      let response = await bot.ask(query);
      console.log("Bard", response);
      return { response };
    } catch (error) {
      console.error("Error processing Bard:", error);
      throw error;
    }
  }
}
