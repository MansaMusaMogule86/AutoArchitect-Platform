import { GoogleGenAI } from "@google/genai";

/**
 * Standardized LLM call function following the Gemini API best practices.
 * Uses process.env.API_KEY directly as required.
 */
export async function callLLM(prompt: string, systemInstruction?: string) {
  // Use the exact initialization pattern required by guidelines
  // process.env.API_KEY is assumed to be provided by the environment
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are a deterministic technical architect. Follow instructions exactly.",
        temperature: 0.1,
      },
    });

    // Access .text property directly (not a method)
    const content = response.text;
    
    if (content === undefined) {
      throw new Error("The model returned an empty response. This may be due to safety filters.");
    }
    
    return content;
  } catch (err: any) {
    // Log details for debugging while throwing a clean error for the UI
    console.error("Gemini Pipeline Error:", err);
    throw new Error(err?.message || "An unexpected error occurred during generation.");
  }
}