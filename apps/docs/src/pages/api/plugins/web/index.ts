import { SearchEngineScraper } from "@/utils/langchain/search";
import { OrganicSearches } from "@/utils/langchain/search/plugin/plugins/organicsearches";
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
    scraper.addPlugin(new OrganicSearches());
    const result = await scraper.search(question);

    res.status(200).json({ result });
  } catch (error) {
    console.error("Error while processing documents:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing documents" });
  }
}
