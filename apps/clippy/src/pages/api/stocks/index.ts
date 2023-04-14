import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

/**
 * @swagger
 * components:
 *   schemas:
 *     AlphaVantageResponse:
 *       type: object
 *       properties:
 *         Note:
 *           type: string
 *         "Error Message":
 *           type: string
 *         [key: string]:
 *           type: object
 *
 * /api/stocks:
 *   get:
 *     operationId: stocks
 *     summary: Get stock market data from Alpha Vantage.
 *     description: Retrieve stock market data by calling a specified function from the Alpha Vantage API.
 *     tags:
 *       - Stocks
 *     parameters:
 *       - in: query
 *         name: fnc
 *         description: The name of the function to call from the Alpha Vantage API.
 *         required: true
 *         schema:
 *           type: string
 *           example: TIME_SERIES_INTRADAY
 *       - in: query
 *         name: symbol
 *         description: The symbol of the stock to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *           example: AAPL
 *       - in: query
 *         name: datatype
 *         description: By default, datatype is equal to json. Strings json and csv are accepted with the following specifications - json returns the weekly time series in JSON format, csv returns the time series as a CSV (comma separated value) file.
 *         required: false
 *         schema:
 *           type: string
 *           example: csv
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlphaVantageResponse'
 *       '400':
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message.
 *                   example: Invalid symbol or function.
 *       '429':
 *         description: Too many requests.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message.
 *                   example: API request limit reached.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message.
 *                   example: Error fetching data from Alpha Vantage API.
 *
 *
 * @param {string} req.query.fnc The name of the function to call from the Alpha Vantage API.
 * @param {Object} req.query.options The options to pass to the Alpha Vantage API function.
 *
 * @param {Object} res The HTTP response object.
 * @param {function} res.status The method to set the HTTP response status.
 * @param {function} res.json The method to send the response body as a JSON object.
 *
 * @throws {Error} If an error occurs while fetching data from Alpha Vantage API.
 */

interface AlphaVantageResponse {
  Note?: string;
  "Error Message"?: string;
  [key: string]: any;
}

const BASE_URL = "https://www.alphavantage.co/query";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AlphaVantageResponse>
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  console.log("Stocks Query", req.query);

  const { fnc, ...options } = req.query;

  if (!fnc) {
    res.status(400).json({
      error: 'The "fnc" query parameter is required.',
    });
    return;
  }

  try {
    let response: AxiosResponse<AlphaVantageResponse>;
    if (!options) {
      response = await axios.get(BASE_URL, {
        params: {
          ...req.query,
          apikey: process.env.ALPHA_VANTA_KEY,
        },
      });
    } else {
      response = await axios.get(BASE_URL, {
        params: {
          ...options,
          function: fnc,
          apikey: process.env.ALPHA_VANTA_KEY,
        },
      });
    }

    if (response.data.Note) {
      console.log("Stocks API request limit reached");
      res.status(429).json({ error: "API request limit reached" });
      return;
    }

    if (response.data["Error Message"]) {
      console.log("Stocks Invalid symbol or function");
      res.status(400).json({ error: "Invalid symbol or function" });
      return;
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data from Alpha Vantage API:", error);
    res
      .status(500)
      .json({ error: "Error fetching data from Alpha Vantage API" });
  }
}
