import { Document } from "langchain/document";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { Tool } from "langchain/tools";
import { SupabaseVectorStore } from "langchain/vectorstores";
import puppeteer from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import { openaiEmbeddings, openaiChat } from "../../openai";
import Scraper from "../../scraper";
import { supabaseClient } from "../../supabase";
import {
  extractNumberedItems,
  splitDocsIntoChunks,
  getTopNUrls,
} from "../utils";
import google from "googlethis";

const SEARCH_OPTIONS = {
  page: 0,
  safe: false, // Safe Search
  parse_ads: false, // If set to true sponsored results will be parsed
  additional_params: {
    // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
    hl: "en",
  },
};

const K_RESULTS = 1;

export class WebSearch extends Tool {
  name = "WebSearch";
  async _call(input: string) {
    puppeteer.use(stealthPlugin());
    //Example input: "how do this year's oscar winners compare to recently released movies for box office sales?"
    /**
     * Break the example input into two questions, for example:
     * 1. "2023 Oscar winners box office sales compared to recently" released movies.
     * 2. "recently released movies box office sales"
     */

    /**
     * 1. This class will first break the question into parts, it could use a NLP tool like GPT to do this.
     * 2. The questions should then be taken apart and searched on Google individually.
     * 3. The top ranking result for the query will be scanned for context, a program such as Puppeteer could be used to do this. If the URL exists in the database then don't reindex it, just pull the context from the database for that question.
     * 4. The context of the page will be extracted, vectorized and stored in a database.
     * 5. The context will be returned along with the source urls.
     */

    /**
     * Example reponse from ChatGPT-3.5 after using the context from the WebSearch tool:
     * "The 2023 Oscar winner for Best Picture, "Everything Everywhere All at Once", earned $100 million at the box [office](url).
     *  Recently released movies such as "Scream IV" have grossed $58,529,284 in its first seven [days](url).
     *  While "Scream VI" has had a strong start at the box office,
     *  it's worth noting that "Everything Everywhere All at Once"
     *  has had a longer run in theater to accumulate its $100 million in box office sales."
     */
    //Use Langchain ChatOpenAI to call GPT and generate questions from our input.
    //Step 1: Break the question into parts

    const generatedQuestions = await openaiChat.call([
      new SystemChatMessage(
        `
        The date current date is ${new Date().toLocaleDateString()}.
        You are an NLP that takes in an input question and splits the question into individual questions that can be used to search the web and return accurate results for the question.  
        As an example, if the input where to be "how do this year's oscar winners compare to recently released movies for box office sales?" 
        You would return questions such as: 
        1. "2023 Oscar winners box office sales compared to recently" released movies. 
        2. "recently released movies box office sales".
        Questions will be asked in the following format: Question: ...
        You will respond only with a numbered list of questions. Do not make any comments, assumptions or other responses. Only return a list of questions. Do not return a long list of questions.
        `
      ),
      new HumanChatMessage(input),
    ]);
    //This function uses regex and take the values from the numbered list and returns them as an array.
    const questions = extractNumberedItems(generatedQuestions.text);
    //Step 2: Search the web for the questions
    //Here we will use Google to search for the questions and return the top result for each question.

    //URL results
    const urls: string[] = [];
    for (const question of questions) {
      try {
        const response = await google.search(question, SEARCH_OPTIONS);
        urls.push(...getTopNUrls(response.results, K_RESULTS));
      } catch (error) {
        console.log("Error searching for question:", question, error);
      }
    }

    //Step 3: Scan the pages for context, here we can use loadFromURLs to scrape the pages and store the context in the db.
    //Check if Database has the URL, if it does then don't scrape it again, just skip it.

    const scraper = new Scraper();
    console.log("Created Scraper");

    let rawDocs: Document[] = [];

    if (urls) {
      console.log("URLs found, loading loadFromURLs");
      rawDocs = await scraper.loadFromURLs(urls);
      console.log("Loaded documents from URLs:", rawDocs);
    }

    console.log("Raw docs:", rawDocs);

    if (rawDocs.length === 0) {
      throw new Error("Failed to extract data from any of the sources");
    }

    const docs = await splitDocsIntoChunks(rawDocs);

    await SupabaseVectorStore.fromDocuments(docs, openaiEmbeddings, {
      client: supabaseClient,
      tableName: "documents",
      queryName: "match_documents",
    });

    // return {
    //   urls,
    //   questions,
    // };
    return "";
  }

  description = `Useful for adding context to a question by searching the world wide web. This tool uses Google search to find the top result to parts of the question, scan the page for context and then return the important context.`;
}
