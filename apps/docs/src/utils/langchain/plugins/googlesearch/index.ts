import { Tool } from "langchain/tools";

import { SearchEngineScraper } from "../../search";
import { Bard } from "../../search/plugin/plugins/google/bard";

export class GoogleSearch extends Tool {
  name = "GoogleSearch";
  async _call(input: string) {
    const scraper = new SearchEngineScraper({
      engine: "Google",
      plugins: [new Bard()],
    });

    try {
      const results = await scraper.search(`
      The current date is ${new Date().toLocaleDateString()}.
      Answer the following question and return a valid answer and any valid sources as as markdown. Do not make any excess comments or pointless chatter. Question: ${input}
      `);
      console.log("Google Search Results:", results);
      return results.Bard.response;
    } catch (error) {
      return "No good search results found";
    }
  }

  description = `GoogleSearch - Useful asking generalized questions that can be answered by searching the web using Google.`;
}
