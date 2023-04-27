import { Bard as GoogleBard } from "googlebard";

interface AnalysisOptions {
  bardKey?: string;
  openaiKey?: string;
}

export class Analysis {
  private bardKey: string;
  private openaiKey: string;

  constructor(options: AnalysisOptions = {}) {
    this.bardKey = options.bardKey || process.env.BARD_KEY || "";
    this.openaiKey = options.openaiKey || process.env.OPENAI_API_KEY || "";
    if (!this.openaiKey) {
      throw new Error("Missing OpenAI Credentials");
    }
    if (!this.bardKey) {
      throw new Error(
        "BARD_KEY is required. Please set it in the environment or pass it as an option."
      );
    }
  }

  async getAnalysis(query: string): Promise<string> {
    const bot = new GoogleBard(this.bardKey);
    const analysis = await bot.ask(query);
    console.log("Analysis", analysis);
    return analysis;
  }
}
