import { PROMPTS } from "../lib/ai/prompts";
import { fill } from "../lib/ai/fill";
import { callLLM } from "../lib/ai/llm";

export interface PipelineConfig {
  name: string;
  description: string;
  onProgress?: (step: number, status: string, content?: string) => void;
}

export interface PipelineResult {
  uiux: string;
  prd: any;
  scaffold: string;
}

export class AutoArchOrchestrator {
  constructor(apiKey?: string) {
    // API key is handled by lib/ai/llm.ts using process.env.API_KEY
  }

  async run(config: PipelineConfig): Promise<PipelineResult> {
    const { name, description, onProgress } = config;

    // Step 1: UI/UX Blueprint
    onProgress?.(1, "Generating UI/UX Blueprint...");
    const uiPrompt = fill(PROMPTS.ui, { name, description });
    const uiux = await callLLM(uiPrompt);
    onProgress?.(1, "Completed UI/UX Blueprint", uiux);

    // Step 2: PRD JSON
    onProgress?.(2, "Architecting PRD JSON...");
    const prdPrompt = fill(PROMPTS.prd, { name, description, ui_blueprint: uiux });
    const prdText = await callLLM(prdPrompt);
    
    let prdJson;
    try {
      prdJson = JSON.parse(prdText);
    } catch (e) {
      console.error("Failed to parse PRD JSON", e);
      prdJson = { error: "Failed to parse generation", raw: prdText };
    }
    onProgress?.(2, "Completed PRD JSON", prdText);

    // Step 3: Codebase Scaffold
    onProgress?.(3, "Scaffolding Codebase...");
    const buildPrompt = fill(PROMPTS.build, { 
      prd_json: JSON.stringify(prdJson), 
      ui_blueprint: uiux 
    });
    const scaffold = await callLLM(buildPrompt);
    onProgress?.(3, "Completed Codebase Scaffold", scaffold);

    return { uiux, prd: prdJson, scaffold };
  }
}