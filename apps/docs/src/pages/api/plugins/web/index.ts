import { SearchEngineScraper } from "@/utils/langchain/search";
import { Crawler } from "@/utils/langchain/search/plugin/plugins/crawler";
import { Bard } from "@/utils/langchain/search/plugin/plugins/google/bard";
import { BardSearch } from "@/utils/langchain/search/plugin/plugins/google/bardsearch";
import { OrganicSearches } from "@/utils/langchain/search/plugin/plugins/google/organicsearches";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }
  console.log("Request body:", req.body);
  try {
    const question = req.body.question;
    console.log("Question:", question);

    // const websearch = new WebSearch();
    // const result = await websearch.call(question);
    const scraper = new SearchEngineScraper();

    scraper.setEngine("Google");
    scraper.addPlugin(new BardSearch());
    //scraper.addPlugin(new Bard());
    const searches = await scraper.search(question);
    // scraper.setEngine("Crawler");
    // scraper.addPlugin(new Crawler());
    // const crawler = await scraper.search(
    //   "https://openai.com/blog/chatgpt-plugins"
    // );

    res.status(200).json({ searches });
  } catch (error) {
    console.error("Error while processing documents:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing documents" });
  }
}
