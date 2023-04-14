import { Search } from "@/openai/engines/search";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

/**
 * @swagger
 * components:
 *   schemas:
 *     SearchResult:
 *       type: object
 *       properties:
 *         pageContent:
 *           type: string
 *           description: The page content from the crawled page.
 *         metadata:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               description: The URL of the crawled page.
 *             timestamp:
 *               type: string
 *               description: The timestamp of the crawl.
 *             pluginName:
 *               type: string
 *               description: The plugin used to crawl the page.
 *     SearchErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: An error message.
 *
 * /api/search:
 *   post:
 *     operationId: search
 *     summary: Perform a similarity search on stored documents. If the documents are not stored, crawl a URL and store the documents before performing the search.
 *     description: Given a query, this endpoint performs a similarity search on the stored documents. Optionally, it can crawl a URL and store the extracted documents in Supabase before the search.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: The request body containing the URL and query.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               description: The URL to crawl and store documents from. Optional.
 *             query:
 *               type: string
 *               description: The query to use for the similarity search. Required.
 *     responses:
 *       200:
 *         description: The response object containing the results of the similarity search.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SearchResult'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchErrorResponse'
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: An error occurred while processing documents.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchErrorResponse'
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing the URL and query.
 * @param {string} [req.body.url] - The URL to crawl and store documents from. Optional.
 * @param {string} req.body.query - The query to use for the similarity search. Required.
 *
 * @param {Object} res - The HTTP response object.
 * @param {function} res.status - The method to set the HTTP response status.
 * @param {function} res.json - The method to send the response body as a JSON object.
 *
 * @throws {Error} If an error occurs during the crawl and store process.
 *
 * @example
 * Request Body:
 * {
 *    "url": "https://en.wikipedia.org/wiki/Coffee",
 *    "query": "What are the different types of coffee?"
 * }
 * Response Body:
 * {
 *    "results": [
 *      {
 *        "pageContent": "Example content from the crawled page...",
 *        "metadata": {
 *          "url": "https://en.wikipedia.org/wiki/Coffee",
 *          "timestamp": "2023-04-11T19:09:07.973Z",
 *          "pluginName": "General"
 *        }
 *      },
 *      {
 *        "pageContent": "Another example content from the crawled page...",
 *        "metadata": {
 *          "url": "https://en.wikipedia.org/wiki/Coffee",
 *          "timestamp": "2023-04-11T19:09:07.973Z",
 *          "pluginName": "General"
 *        }
 *      }
 *    ]
 * }
 */

interface RequestBody {
  url?: string;
  query: string;
}

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

  const body: RequestBody = req.body;

  if (!body.query) {
    res.status(400).json({
      error: 'The "query" field is required in the request body.',
    });
    return;
  }

  try {
    const { url, query } = body;
    console.log("URL:", url);
    console.log("Query:", query);

    const search = new Search({});
    const results = await search.search(url ?? null, query);

    res.status(200).json({ results });
  } catch (error) {
    console.error("Error while processing documents:", error);
    res.status(500).json({
      error: "An error occurred while processing documents",
    });
  }
}
