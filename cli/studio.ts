import { AutoArchOrchestrator } from "../core/orchestrator";

// Safe access to process to avoid 'ReferenceError' in browser environments
const isNode = typeof process !== 'undefined';
const args = isNode ? (process as any).argv?.slice(2) || [] : [];
const params: Record<string, string> = {};

if (isNode) {
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      params[args[i].replace('--', '')] = args[i + 1];
      i++;
    }
  }
}

async function runCli() {
  if (!isNode) return;

  const name = params.name || "Unnamed Project";
  const description = params.description;
  const outputDir = params.output || "./output";
  const apiKey = (process as any).env?.API_KEY;

  if (!description) {
    console.error("Error: --description is required.");
    (process as any).exit?.(1);
    return;
  }

  if (!apiKey) {
    console.error("Error: API_KEY environment variable is not set.");
    (process as any).exit?.(1);
    return;
  }

  console.log(`\n🚀 AutoArchitect Studio CLI v1.0.0`);
  console.log(`Project: ${name}`);
  console.log(`Output: ${outputDir}\n`);

  const orchestrator = new AutoArchOrchestrator(apiKey);

  try {
    await orchestrator.run({
      name,
      description,
      onProgress: (step, status) => {
        console.log(`[Step ${step}] ${status}`);
      }
    });

    console.log(`\n✅ Generation complete! Assets prepared for ${outputDir}`);
  } catch (error) {
    console.error("\n❌ Pipeline failed:", error);
    (process as any).exit?.(1);
  }
}

// Ensure execution happens only in CLI context, not when imported in web browser
if (isNode && (process as any).env?.NODE_ENV !== 'test') {
  // studio-cli execution point logic would go here
}

export default runCli;