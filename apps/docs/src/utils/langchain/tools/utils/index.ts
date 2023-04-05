import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";

/**
 * Extracts numbered items from a string and returns an array of each item.
 *
 * @param inputString - The string containing numbered items.
 * @returns An array of each numbered item in the string.
 */
export function extractNumberedItems(inputString: string): string[] {
  const regex = /^[\d]+[.\)]\s+(.*)$/gm;
  const matches: string[] = [];
  let match;

  while ((match = regex.exec(inputString))) {
    const numberedItem = match[1];

    if (numberedItem !== undefined) {
      matches.push(numberedItem);
    }
  }

  return matches;
}

export async function splitDocsIntoChunks(
  docs: Document[]
): Promise<Document[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  });

  return await splitter.splitDocuments(docs);
}

export interface SearchResult {
  title: string;
  description: string;
  url: string;
  is_sponsored: boolean;
  favicons: {
    high_res: string;
    low_res: string;
  };
}

/**
 * Returns an array of URL strings for the top `n` search results.
 * @param searchResults - An array of search results to filter.
 * @param n - The number of results to return.
 * @returns An array of URL strings for the top `n` search results.
 */
export function getTopNUrls(
  searchResults: SearchResult[],
  n: number
): string[] {
  // Sort the search results by their index in the original array.
  const sortedResults = searchResults.slice(0, n).sort((a, b) => {
    return searchResults.indexOf(a) - searchResults.indexOf(b);
  });

  // Extract the URLs from the sorted search results.
  const urls = sortedResults.map((result) => result.url);

  return urls;
}
