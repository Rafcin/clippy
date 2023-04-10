import { Bard as GoogleBard } from "googlebard";

interface AnalysisOptions {
  bardKey?: string;
}

export class Analysis {
  private bardKey: string;

  constructor(options: AnalysisOptions = {}) {
    this.bardKey = options.bardKey || process.env.BARD_KEY || "";
    if (!this.bardKey) {
      throw new Error(
        "BARD_KEY is required. Please set it in the environment or pass it as an option."
      );
    }
  }

  async getAnalysis(url: string, query: string): Promise<string> {
    const bot = new GoogleBard(this.bardKey);
    const analysis = await bot.ask(`Given the URL ${url}, ${query}`);
    console.log("Analysis", analysis);
    return analysis;
  }
}
