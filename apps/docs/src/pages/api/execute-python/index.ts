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
 *           description: The Python code to execute.
 *         input:
 *           type: string
 *           description: The input to pass to the Python code. Optional.
 *     ExecutePythonCodeResponse:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *           description: The result of the executed Python code.
 *     ExecutePythonCodeErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: An error message.
 *
 * /api/execute-python:
 *   post:
 *     operationId: executePython
 *     summary: Execute Python code and return results if any are returned.
 *     description: Given Python code, this endpoint executes the code and returns the result. Optionally, it can accept an input parameter to pass to the Python code.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: The request body containing the Python code and input.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ExecutePythonCodeRequest'
 *     responses:
 *       200:
 *         description: The response object containing the result of the executed Python code.
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
 * @param {Object} req.body - The request body containing the Python code and input.
 * @param {string} req.body.code - The Python code to execute. Required.
 * @param {string} [req.body.input] - The input to pass to the Python code. Optional.
 *
 * @param {Object} res - The HTTP response object.
 * @param {function} res.status - The method to set the HTTP response status.
 * @param {function} res.json - The method to send the response body as a JSON object.
 *
 * @throws {Error} If an error occurs during the Python code execution.
 *
 * @example
 * Request Body:
 * {
 *   "code": "print('Hello, World!')",
 *   "input": ""
 * }
 * Response Body:
 * {
 *   "result": "Hello, World!"
 * }
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const { code, input } = req.body;

  if (!code) {
    res.status(400).json({ error: 'The "code" field is required.' });
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
      scriptPath: "src/openai/engines/python", // Update this path to point to your script
      args: [code],
      input: input ? JSON.stringify(input) : null,
    };

    const pyShell = new PythonShell("execute.py", options);

    if (options.input) {
      pyShell.stdin.write(options.input + "\n");
      pyShell.stdin.end();
    }

    pyShell.on("message", (message) => {
      console.log("Python message:", message);
      resolve(message);
    });

    pyShell.end((err) => {
      if (err) {
        console.error("Error executing Python code:", err);
        reject(err);
      }
    });
  });
}
