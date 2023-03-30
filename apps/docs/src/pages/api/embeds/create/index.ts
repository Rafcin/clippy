import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { supabaseClient } from "@/server/supabase";
import { CheerioCrawler, log, LogLevel } from "crawlee";

const docSize: number = 1000;

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openAi = new OpenAIApi(configuration);

log.setLevel(LogLevel.DEBUG);

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === "POST") {
    const { urls } = body;
    console.log("urls: ", urls);
    const documents = await getDocuments(urls);

    for (const { url, body } of documents) {
      const input = body.replace(/\n/g, " ");

      console.log("\nDocument length: \n", body.length);
      console.log("\nURL: \n", url);

      const embeddingResponse = await openAi.createEmbedding({
        model: "text-embedding-ada-002",
        input,
      });

      console.log("\nembeddingResponse: \n", embeddingResponse);
      //@ts-ignore
      const [{ embedding }] = embeddingResponse.data.data;

      await supabaseClient.from("documents").insert({
        content: input,
        embedding,
        url,
      });
    }

    return res.status(200).json({ success: true });
  }

  return res
    .status(405)
    .json({ success: false, message: "Method not allowed" });
}

async function getDocuments(urls: string[]) {
  const documents = [];
  for (const url of urls) {
    const parsedUrl = new URL(url);
    const content = await extractContent(parsedUrl);
    for (const { path, body } of content) {
      let start = 0;
      while (start < body.length) {
        const end = start + docSize;
        const chunk = body.slice(start, end);
        documents.push({ url: path ? `${url}/${path}` : url, body: chunk });
        start = end;
      }
    }
  }
  return documents;
}

async function extractContent(
  url: URL
): Promise<{ path: string; body: string }[]> {
  const documents: { path: string; body: string }[] = [];

  const crawler = new CheerioCrawler({
    minConcurrency: 10,
    maxConcurrency: 50,

    // On error, retry each page at most once.
    maxRequestRetries: 1,

    // Increase the timeout for processing of each page.
    requestHandlerTimeoutSecs: 30,

    // Limit to 10 requests per one crawl
    maxRequestsPerCrawl: 10,
    async requestHandler({ request, $ }) {
      const articleText = $("body").text();
      documents.push({ path: "", body: articleText });
    },
  });

  await crawler.run([url.href]);
  console.log("Extract Documents: ", documents);
  return documents;
}
