import type { Plugin } from "../../..";
import type { Page } from "puppeteer";
import { EngineType } from "@/openai/engines/search";

/**
 * OrganicSearches
 * @description Returns the top organic searches from page one of Google.
 */

export class OrganicSearches implements Plugin {
  name: string = "OrganicSearches";
  engine: EngineType = "Google";

  async process(data: { page: Page }): Promise<any> {
    const { page } = data;
    // Click the button
    await page.click('[aria-label="About this result"]');

    // Wait for the modal to appear using waitForFunction
    await page.waitForFunction(
      'Array.from(document.body.querySelectorAll("div")).some(div => div.className.includes("h2Nkyc"))'
    );

    const searchResults = await page.evaluate(() => {
      const results = Array.from(document.querySelectorAll(".tF2Cxc"));
      return results.map((result, index) => {
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

    return { response: searchResults };
  }
}
