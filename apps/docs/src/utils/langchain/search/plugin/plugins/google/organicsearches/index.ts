import type { Plugin } from "../../..";
import type { Page } from "puppeteer";
import { EngineType } from "@/utils/langchain/search";

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
        const richSnippet = result.querySelector(
          "#eob_3 > div > div:nth-child(1)"
        ) as HTMLElement;
        const extensions = richSnippet
          ? Array.from(richSnippet.querySelectorAll("div")).map(
              (s) => s.textContent?.trim() ?? ""
            )
          : [];

        const snippetContainer = result.querySelector(".VwiC3b");
        const date =
          snippetContainer?.querySelector(".MUxGbd.wuQ4Ob.WZ8Tjf")
            ?.textContent || "";
        const description =
          snippetContainer?.querySelector(
            ".VwiC3b.yXK7lf.MUxGbd.yDYNvb.lyLwlc > span:nth-child(2)"
          )?.textContent || "";

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

        // Find the modal with the h2Nkyc class
        const modal = Array.from(document.querySelectorAll("div")).find((div) =>
          div.className.includes("h2Nkyc")
        );

        const about_text =
          modal?.querySelector(
            "#gsr > div.h2Nkyc > div > div > div.cygiMd > div:nth-child(1) > div.DCiuzf.wHYlTd > span"
          )?.textContent || "";
        const site_security =
          modal
            ?.querySelector(
              "#gsr > div.h2Nkyc > div > div > div.cygiMd > div:nth-child(1) > ul > li:nth-child(2) > div > span > b"
            )
            ?.textContent?.toLowerCase() || "";

        return {
          position: index + 1,
          title: result.querySelector("h3.LC20lb")?.textContent || "",
          link: result.querySelector(".yuRUbf a")?.getAttribute("href") || "",
          displayedLink:
            result.querySelector(".yuRUbf span")?.textContent || "",
          favicon: result.querySelector(".XNo5Ab")?.getAttribute("src") || "",
          snippet: {
            date,
            description,
          },
          rich_snippet: {
            bottom: {
              extensions,
              // You can add specific detected_extensions if needed
            },
          },
          related_links: relatedLinks,
          metadata: metadata,
          // Add about text and site security information
          about_text: about_text,
          site_security: site_security,
        };
      });
    });

    return { organic_searches: searchResults };
  }
}
