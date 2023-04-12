import { Analysis } from "@/openai/engines/analysis";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

/**
 * @swagger
 * components:
 *   schemas:
 *     AnalysisRequestBody:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           description: The URL to analyze. Required.
 *         query:
 *           type: string
 *           description: The query to ask about the URL such as "What is this URL about?" or "Summarize each section of the URL". Required.
 *   responses:
 *     AnalysisResponse:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *           description: The analysis of the URL.
 *     AnalysisErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: An error message.
 *
 * /api/analysis:
 *   post:
 *     operationId: analysis
 *     summary: Get an insightful analysis of a URL
 *     description: Given a URL and a natural language query, return an insightful analysis of the content of the URL.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       $ref: '#/components/schemas/AnalysisRequestBody'
 *     responses:
 *       200:
 *         description: The analysis of the URL.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/AnalysisResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalysisErrorResponse'
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: An error occurred while processing documents.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalysisErrorResponse'
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
