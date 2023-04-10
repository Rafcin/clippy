// BasePlugin.ts
import type { Page } from "puppeteer";
import { Document } from "langchain/document";
import { Plugin } from "../..";

export abstract class BasePlugin implements Plugin {
  abstract name: string;
  abstract engine?: string;
  abstract baseUrl?: string;

  async process(page: Page): Promise<Document[]> {
    const data = await this.extractData(page);
    if (!data) {
      return [];
    }

    const documents = this.createDocuments(data);
    return documents;
  }

  abstract extractData(page: Page): Promise<any>;

  createDocuments(data: any): Document[] {
    const maxChars = 3500;
    const sections = data.sections || [{}];
    const documents: Document[] = [];

    sections.forEach((section: any) => {
      let content = section.content || "";

      while (content.length > 0) {
        const pageContent = content.slice(0, maxChars);
        content = content.slice(maxChars);

        documents.push(
          new Document({
            pageContent,
            metadata: {
              pluginName: this.name,
              title: data.title || "",
              description: data.description || "",
              lastModified: data.lastModified || "",
              ogImage: data.ogImage || "",
              sectionTitle: section.title || "",
            },
          })
        );
      }
    });

    return documents;
  }
}
