import { Search } from "@oxygen/llm";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

/**
 * @swagger
 * components:
 *   schemas:
 *     WebSearchResult:
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
 *     WebSearchErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: An error message.
 *
 * /api/web-search?similarityQuery={similarityQuery}&url={url}:
 *   get:
 *     operationId: webSearch
 *     summary: This API takes a query and an optional URL and returns the results of a similarity search on the stored documents. If a URL is provided, it crawls the URL and stores the documents before performing the search.
 *     description: Given a string query, this endpoint performs a similarity search on the stored documents. Optionally, it can crawl a URL and store the extracted documents in vector database before the search.
 *     parameters:
 *       - in: query
 *         name: similarityQuery
 *         description: The similarity query to use for the similarity search. Required.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: url
 *         description: The URL to crawl and store documents from. Optional.
 *         schema:
 *           type: string
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
 *                     $ref: '#/components/schemas/WebSearchResult'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WebSearchErrorResponse'
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: An error occurred while processing documents.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WebSearchErrorResponse'
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} [req.query.url] - The URL to crawl and store documents from. Optional.
 * @param {string} req.query.similarityQuery - The query to use for the similarity search. Required.
 *
 * @param {Object} res - The HTTP response object.
 * @param {function} res.status - The method to set the HTTP response status.
 * @param {function} res.json - The method to send the response body as a JSON object.
 *
 * @throws {Error} If an error occurs during the crawl and store process.
 *
 * @example
 * Request URL:
 * /api/search?query=What%20are%20the%20different%20types%20of%20coffee%3F&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCoffee
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

interface QueryParams {
  url?: string;
  similarityQuery: string;
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

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { url, similarityQuery }: QueryParams =
    req.query as unknown as QueryParams;

  if (!similarityQuery || typeof similarityQuery !== "string") {
    res.status(400).json({
      error:
        'The "similarityQuery" query parameter is required and must be a string.',
    });
    return;
  }

  if (url && typeof url !== "string") {
    res.status(400).json({
      error: 'The "url" query parameter must be a string.',
    });
    return;
  }

  try {
    console.log("URL:", url);
    console.log("Similarity Query:", similarityQuery);

    const search = new Search({});
    const results = await search.search(url ?? null, similarityQuery);

    res.status(200).json({ results });
  } catch (error) {
    console.error("Error while processing documents:", error);
    res.status(500).json({
      error: "An error occurred while processing documents",
    });
  }
}
