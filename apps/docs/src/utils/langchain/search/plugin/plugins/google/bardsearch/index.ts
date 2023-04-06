import type { Plugin } from "../../..";
import type { Page, WaitForOptions } from "puppeteer";
import { EngineType } from "@/utils/langchain/search";
import { Bard as GoogleBard } from "googlebard";
import TurndownService from "turndown";

async function navigateWithRetry(
  page: Page,
  url: string,
  options: WaitForOptions,
  maxRetries = 3
) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.goto(url, options);
      return;
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      console.warn(`Retry ${i + 1} failed. Retrying...`);
    }
  }
}

async function findLargestTextElement(page: Page) {
  const elements = await page.$$(
    "main, article, div, section, #content, .content, #article, .article, #bodyContent, .post, .entry-content, .post-content, .article-content, .article-container, .StandardArticleBody_body, .l-container"
  );

  let largestTextElement = null;
  let largestTextLength = 0;

  for (const element of elements) {
    const textContent = await page.evaluate(
      (el) => el.textContent?.trim() || "",
      element
    );
    const textLength = textContent.length;

    if (textLength > largestTextLength) {
      largestTextLength = textLength;
      largestTextElement = element;
    }
  }

  return largestTextElement;
}

export class BardSearch implements Plugin {
  name: string = "BardSearch";
  engine: EngineType = "Google";

  async process(data: { page: Page; query?: string }): Promise<any> {
    const { page, query } = data;

    if (!query) {
      throw new Error("Query is required to process Bard.");
    }

    const bardKey = process.env.BARD_KEY;

    if (!bardKey) {
      throw new Error(
        "BARD_KEY is required. Please set it in the environment."
      );
    }

    // Click the button
    await page.click('[aria-label="About this result"]');

    // Wait for the modal to appear using waitForFunction
    await page.waitForFunction(
      'Array.from(document.body.querySelectorAll("div")).some(div => div.className.includes("h2Nkyc"))'
    );

    const processedResults = await page.evaluate(() => {
      const results = Array.from(document.querySelectorAll(".tF2Cxc"));
      // Cut size, the cut size is set to 3 to reduce excess calls. First 3 urls are often related to and are the most relevant.
      const SIZE = 3;
      const searchResults = results.slice(0, SIZE);

      return searchResults.map((result, index) => {
        /**
         * Snipper
         */
        const snippetContainer = result.querySelector(".VwiC3b");
        const snippetDate =
          snippetContainer?.querySelector(".MUxGbd.wuQ4Ob.WZ8Tjf")
            ?.textContent || "";
        const snippetDescription =
          snippetContainer?.querySelector(
            ".VwiC3b.yXK7lf.MUxGbd.yDYNvb.lyLwlc > span:nth-child(2)"
          )?.textContent || "";

        /**
         * Related Links
         */
        const relatedLinksContainer = result.querySelector(
          ".Z26q7c.UK95Uc"
        ) as HTMLElement;
        const relatedLinks = relatedLinksContainer
          ? Array.from(relatedLinksContainer.querySelectorAll("a")).map(
              (link) => ({
                title: link.textContent || "",
                link: link.getAttribute("href") || "",
              })
            )
          : [];
        /**
         * Metadata
         */
        const metadata = Array.from(
          result.querySelectorAll(".IThcWe .rEYMH"),
          (metadataElement) => {
            const label =
              metadataElement?.querySelector(".YrbPuc")?.textContent?.trim() ||
              "";
            const value =
              metadataElement?.querySelector(".wHYlTd")?.textContent?.trim() ||
              "";
            return { label, value };
          }
        );

        /**
         * About Info
         */
        // Find the modal with the h2Nkyc class
        const about = Array.from(document.querySelectorAll("div")).find((div) =>
          div.className.includes("h2Nkyc")
        );

        const about_text =
          about?.querySelector(
            "#gsr > div.h2Nkyc > div > div > div.cygiMd > div:nth-child(1) > div.DCiuzf.wHYlTd > span"
          )?.textContent || "";
        const site_security =
          about
            ?.querySelector(
              "#gsr > div.h2Nkyc > div > div > div.cygiMd > div:nth-child(1) > ul > li:nth-child(2) > div > span > b"
            )
            ?.textContent?.toLowerCase() || "";

        /**
         * General
         */
        const title = result.querySelector("h3.LC20lb")?.textContent || "";
        const link =
          result.querySelector(".yuRUbf a")?.getAttribute("href") || "";
        const displayedLink =
          result.querySelector(".yuRUbf span")?.textContent || "";
        const favicon =
          result.querySelector(".XNo5Ab")?.getAttribute("src") || "";

        const general: any = {
          position: index + 1,
          title: title,
          link: link,
          displayedLink: displayedLink,
          favicon: favicon,
          related_links: relatedLinks,
          metadata: metadata,
          about: {
            about_text: about_text,
            site_security: site_security,
          },
          snippet: {
            date: snippetDate,
            description: snippetDescription,
          },
        };

        return general;
      });
    });

    const processedResultsWithInsights = await Promise.all(
      processedResults.map(async (general, index) => {
        try {
          // Markdown service
          const turndownService = new TurndownService();

          await navigateWithRetry(page, general.link, {
            waitUntil: "networkidle2",
            timeout: 60000,
          });

          console.log("Visiting", general.link);

          const description = await page.$eval(
            'meta[name="description"]',
            (el) => el.getAttribute("content")
          );
          console.log("Description", description);
          const image = await page.$eval('meta[property="og:image"]', (el) =>
            el.getAttribute("content")
          );
          console.log("Image", image);

          const mainContentElement = await findLargestTextElement(page);

          console.log("Main content element", mainContentElement);
          if (mainContentElement) {
            const mainContentHTML = await page.evaluate(
              (el) => el.innerHTML,
              mainContentElement
            );
            //console.log("Main content HTML", mainContentHTML);
            const content = turndownService.turndown(mainContentHTML);
            //console.log("Content", content);
            const bot = new GoogleBard(bardKey);
            const response: any = await bot.ask(`
            Given the following website contents:
            - Title: ${general.title}
            - Link: ${general.link}
            - Description: ${description}
            - Content: ${content}
            Write me a summarized response with the relevant information that answers the question: ${query}
            `);
            console.log("Bard Insights", response);
            return {
              ...general,
              insights: {
                description: description,
                image: image,
                response: response,
              },
            };
          } else {
            return general;
          }
        } catch (error) {
          console.error("Error processing Bard insights:", error);
          return general;
        }
      })
    );

    return { response: processedResultsWithInsights };
  }
}
