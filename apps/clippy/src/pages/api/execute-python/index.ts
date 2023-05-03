import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { PythonShell } from "python-shell";

/**
 * @swagger
 * components:
 *   schemas:
 *     ExecutePythonCodeRequest:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           description: The Python code to execute. The code should be free of comments and formatted as a code input.
 *         input:
 *           type: string
 *           description: The input to pass to the Python code. Optional. Use this query parameter when providing inputs like strings, integers, or JSON objects. If no input is required, use only the "code" query parameter.
 *     ExecutePythonCodeResponse:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *           description: The result of the executed Python code. If the code produces images, markdown, or other similar outputs, render those outputs as markdown.
 *     ExecutePythonCodeErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: An error message.
 *
 * /api/execute-python:
 *   get:
 *     operationId: executePython
 *     summary: Execute Python code and return results if any are returned.
 *     description: Given Python code, this endpoint executes the code and returns the result. Optionally, it can accept an input parameter to pass to the Python code.
 *     parameters:
 *       - in: query
 *         name: code
 *         description: The Python code to execute. The code should be free of comments and formatted as a code input.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: input
 *         description: The input to pass to the Python code. Optional. Use this query parameter when providing inputs like strings, integers, or JSON objects. If no input is required, use only the "code" query parameter.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The response object containing the result of the executed Python code. If the code produces images, markdown, or other similar outputs, render those outputs as markdown.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExecutePythonCodeResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExecutePythonCodeErrorResponse'
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: An error occurred while executing the Python code.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExecutePythonCodeErrorResponse'
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.query - The query parameters containing the Python code and input.
 * @param {string} req.query.code - The Python code to execute. The code should be free of comments and formatted as a code input.
 * @param {string} [req.query.input] - The input to pass to the Python code. Optional. Use this query parameter when providing inputs like strings, integers, or JSON objects. If no input is required, use only the "code" query parameter.
 *
 * @param {Object} res - The HTTP response object.
 * @param {function} res.status - The method to set the HTTP response status
 * @param {function} res.json - The method to send the response body as a JSON object.
 *
 * @throws {Error} If an error occurs during the Python code execution.
 *
 * @example
 * GET /api/execute-python?code="from sympy import symbols, Eq, solve\n\nB, G = symbols('B G')\neq1 = Eq(B, 0.3 * B + 5 * G)\neq2 = Eq(100 * B + 200 * G, 1000)\nsolution = solve((eq1, eq2), (B, G))\nsolution[B]&input=
 * Response Body:
 * {
 *   "result": 7.81250000000000
 * }
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const { code, input } = req.query;

  if (!code) {
    res.status(400).json({ error: 'The "code" query parameter is required.' });
    return;
  }

  try {
    const result = await executePythonCode(code, input);
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error executing Python code:", error);
    res.status(500).json({ error: "Error executing Python code" });
  }
}

async function executePythonCode(code: any, input: any) {
  return new Promise((resolve, reject) => {
    const options = {
      pythonOptions: ["-u"],
      scriptPath: "src/python", // Update this path to point to your script
      args: [code],
      input: input ? JSON.stringify(input) : null,
    };

    const pyShell = new PythonShell("execute.py", options);

    if (options.input) {
      pyShell.stdin.write(options.input + "\n");
      pyShell.stdin.end();
    }

    let output = "";

    pyShell.on("message", (message) => {
      output += message;
    });

    pyShell.on("error", (err) => {
      console.error("Error executing Python code:", err);
      reject(err);
    });

    pyShell.on("close", () => {
      resolve(output);
    });
  });
}
