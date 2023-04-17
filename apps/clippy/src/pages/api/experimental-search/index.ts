import { Analysis } from "@oxygen/openai";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

/**
 * @swagger
 * components:
 *   schemas:
 *     ExperimentalSearchResponse:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *           description: The analysis of the URL.
 *     ExperimentalSearchErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: An error message.
 *
 * /api/experimental-search:
 *   get:
 *     operationId: experimentalSearch
 *     summary: This API uses a large language model to return insightful results. This model is connected to the web and can provide current info.
 *     description: Give this API a query and it will return an insightful result. This model is connected to the web and can provide current info.
 *     parameters:
 *       - in: query
 *         name: query
 *         description: The well written specific query to ask about the URL such as "What is this URL about?" or "Summarize each section of the URL".
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The insightful context for the query.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExperimentalSearchResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExperimentalSearchErrorResponse'
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: An error occurred while processing documents.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExperimentalSearchErrorResponse'
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.query.query - The query to use for the experimental search. Required.
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

interface RequestQuery {
  query: string;
}

interface ResponseData {
  result: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { error: string }>
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { query } = req.query as unknown as RequestQuery;

  if (!query) {
    res
      .status(400)
      .json({ error: 'The "query" parameter is required in the request.' });
    return;
  }

  try {
    console.log("Query:", query);

    const analysis = new Analysis();
    const result = await analysis.getAnalysis(query);

    res.status(200).json({ result });
  } catch (error) {
    console.error("Error while processing documents:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing documents" });
  }
}
