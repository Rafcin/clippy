import type { Plugin } from "../..";
import type { Page } from "puppeteer";

export class OrganicSearches implements Plugin {
  name: string = "OrganicSearches";

  async process(page: Page): Promise<any> {
    // Click the button
    await page.click('[aria-label="About this result"]');

    // Wait for the modal to appear using waitForFunction
    await page.waitForFunction(
      'Array.from(document.body.querySelectorAll("div")).some(div => div.className.includes("h2Nkyc"))'
    );

    const searchResults = await page.evaluate(() => {
      const results = Array.from(document.querySelectorAll(".tF2Cxc"));
      return results.map((result, index) => {
        const sitelinks = Array.from(result.querySelectorAll(".VNLkW a"));
        const sitelinksData = sitelinks.map((link) => ({
          title: link.textContent || "",
          link: link.getAttribute("href") || "",
        }));

        const richSnippet = result.querySelector(".AUiS2") as HTMLElement;
        const extensions = richSnippet
          ? Array.from(richSnippet.querySelectorAll(".i4vd5e span")).map(
              (s) => s.textContent?.trim() ?? ""
            )
          : [];

        const aboutThisResult = result.querySelector(".QmUzgb") as HTMLElement;
        const sourceInfoLink = aboutThisResult?.querySelector("a");
        const sourceIcon = aboutThisResult?.querySelector("img");
        const sourceTexts = aboutThisResult
          ? Array.from(aboutThisResult.querySelectorAll(".R8x7c"))
          : [];

        const snippetContainer = result.querySelector(".VwiC3b");
        const date =
          snippetContainer?.querySelector(".MUxGbd.wuQ4Ob.WZ8Tjf")
            ?.textContent || "";
        const description =
          snippetContainer?.querySelector(".MUxGbd:not(.wuQ4Ob)")
            ?.textContent || "";

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
          sitelinks: {
            inline: sitelinksData,
          },
          rich_snippet: {
            bottom: {
              extensions,
              // You can add specific detected_extensions if needed
            },
          },
          about_this_result: aboutThisResult
            ? {
                source: {
                  description: sourceTexts[0]?.textContent || "",
                  source_info_link: sourceInfoLink?.getAttribute("href") || "",
                  security:
                    sourceIcon?.getAttribute("alt") === "Secure"
                      ? "secure"
                      : "",
                  icon: sourceIcon?.getAttribute("src") || "",
                },
                keywords: sourceTexts
                  .slice(1)
                  .map((s) => s.textContent?.trim() ?? ""),
              }
            : null,
          about_page_link:
            result
              .querySelector(".action-menu a:nth-child(1)")
              ?.getAttribute("href") || "",
          cached_page_link:
            result
              .querySelector(".action-menu a:nth-child(2)")
              ?.getAttribute("href") || "",
          related_pages_link:
            result
              .querySelector(".action-menu a:nth-child(3)")
              ?.getAttribute("href") || "",
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
