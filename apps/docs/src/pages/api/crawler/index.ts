import { Crawler } from "@/openai/engines/crawler";
import { General } from "@/openai/engines/crawler/plugin/plugins/general";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

/**
 * @name POST /api/crawler/analysis
 * @description This endpoint is used to analyze a url and returns a string analysis of the url.
 * @param {string} url - The url to analyze.
 * @param {string} query - A query to ask about the url such as "What is this url about?" or "Summarize each section of the url".
 * @returns {string} Analysis of the url.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }
  try {
    const { url, query } = req.body;
    console.log("URL:", url);
    console.log("Query:", query);
    const crawler = new Crawler({ plugins: [new General()] });
    const results = await crawler.getDataFromUrl(url);
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error while processing documents:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing documents" });
  }
}
