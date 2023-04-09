import { Plugin } from "../..";
import type { Page } from "puppeteer";
import { Document } from "langchain/document";

export class Wikipedia implements Plugin {
  name: string = "Wikipedia";
  engine?: string;
  baseUrl: string = "https://en.wikipedia.org";

  async process(page: Page): Promise<Document[]> {
    const data = await page.evaluate(
      (): {
        title: string;
        description: string;
        lastModified: string;
        ogImage: string;
        sections: { title: string; content: string }[];
      } | null => {
        const titleElement: HTMLElement | null =
          document.querySelector("h1#firstHeading");
        const contentElement: HTMLElement | null = document.querySelector(
          "div#mw-content-text"
        );
        const lastModifiedElement: HTMLElement | null = document.querySelector(
          "#footer-info-lastmod"
        );
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
        const lastModified: string =
          lastModifiedElement?.innerText?.replace(/Last edited on /, "") || "";
        const ogImage: string = ogImageElement?.getAttribute("content") || "";

        const sectionElements: NodeListOf<HTMLElement> =
          contentElement.querySelectorAll("h2, h3, p");
        const sections: { title: string; content: string }[] = [];

        let currentSectionTitle = "";
        let currentSectionContent = "";

        sectionElements.forEach((element) => {
          if (element.tagName === "H2" || element.tagName === "H3") {
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
          lastModified,
          ogImage,
          sections,
        };
      }
    );

    if (!data) {
      return [];
    }

    const documents = data.sections.map(
      (section) =>
        new Document({
          pageContent: section.content,
          metadata: {
            pluginName: this.name,
            title: data.title,
            description: data.description,
            lastModified: data.lastModified,
            ogImage: data.ogImage,
            sectionTitle: section.title,
          },
        })
    );

    return documents;
  }
}
