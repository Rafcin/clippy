import { Crawler } from "@/openai/engines/crawler";
import { SearchEngineScraper } from "@/openai/engines/search";
import { BardSearch } from "@/openai/engines/search/plugin/plugins/google/bardsearch";
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
    const crawler = new Crawler();
    res.status(200).json({ searches });
  } catch (error) {
    console.error("Error while processing documents:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing documents" });
  }
}
