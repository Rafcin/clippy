import { Analysis } from "@/openai/engines/analysis";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

/**
 * @name POST /api/analysis
 * @function
 *
 * @description This API endpoint takes a URL and a natural language query and returns an insightful analysis of the content of the URL.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing the URL and query.
 * @param {string} req.body.url - The URL to analyze. Required.
 * @param {string} req.body.query - The query to ask about the URL such as "What is this URL about?" or "Summarize each section of the URL". Required.
 *
 * @param {Object} res - The HTTP response object.
 * @param {function} res.status - The method to set the HTTP response status.
 * @param {function} res.json - The method to send the response body as a JSON object.
 *
 * @returns {string} The analysis of the URL.
 *
 * @throws {Error} The BARD_KEY is required but not provided.
 *
 * @example
 * Request Body:
 * {
 *    "url": "https://en.wikipedia.org/wiki/Coffee",
 *    "query": "Tell me about this article and any interesting key points"
 * }
 * Response Body:
 * {
 *    "result": "The article you provided is about coffee, a brewed drink prepared from roasted coffee beans, the seeds of berries..."
 * }
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
    const crawler = new Analysis();
    const result = await crawler.getAnalysis(url, query);
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error while processing documents:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing documents" });
  }
}
