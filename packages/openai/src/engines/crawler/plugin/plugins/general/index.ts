import type { Page } from "puppeteer";
import { BasePlugin } from "../base";

export class General extends BasePlugin {
  baseUrl?: string | undefined;
  name: string = "General";
  engine?: string;

  async extractData(page: Page): Promise<any> {
    return await page.evaluate(() => {
      const titleElement: HTMLElement | null =
        document.querySelector("head title");
      const contentElement: HTMLElement | null = document.querySelector("body");
      const descriptionElement: HTMLElement | null = document.querySelector(
        "meta[name='description']"
      );
      const ogImageElement: HTMLElement | null = document.querySelector(
        "meta[property='og:image']"
      );

      if (!titleElement || !contentElement) {
        return null;
      }

      const title: string = titleElement.innerText.trim() || "";
      const description: string =
        descriptionElement?.getAttribute("content") || "";
      const ogImage: string = ogImageElement?.getAttribute("content") || "";

      const sectionElements: NodeListOf<HTMLElement> =
        contentElement.querySelectorAll(
          "h1, h2, h3, p, table, ul, ol, pre, code"
        );
      const sections: { title: string; content: string }[] = [];

      let currentSectionTitle = "";
      let currentSectionContent = "";

      sectionElements.forEach((element) => {
        if (
          element.tagName === "H1" ||
          element.tagName === "H2" ||
          element.tagName === "H3"
        ) {
          if (currentSectionTitle !== "" && currentSectionContent !== "") {
            sections.push({
              title: currentSectionTitle,
              content: currentSectionContent.trim(),
            });
          }
          currentSectionTitle = element.innerText.trim();
          currentSectionContent = "";
        } else {
          currentSectionContent += " " + element.innerText.trim();
        }
      });

      if (currentSectionTitle !== "" && currentSectionContent !== "") {
        sections.push({
          title: currentSectionTitle,
          content: currentSectionContent.trim(),
        });
      }

      return {
        title,
        description,
        ogImage,
        sections,
      };
    });
  }
}
