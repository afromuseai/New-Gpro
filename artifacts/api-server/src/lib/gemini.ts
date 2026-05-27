// @ts-nocheck
import { GoogleGenAI, Type } from "@google/genai";

const BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;
const API_KEY = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;

export const isGeminiEnabled = (): boolean =>
  Boolean(BASE_URL && API_KEY);

let cachedClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  if (!isGeminiEnabled()) return null;
  if (!cachedClient) {
    cachedClient = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        apiVersion: "",
        baseUrl: BASE_URL,
      },
    });
  }
  return cachedClient;
}

/**
 * Run Gemini with a JSON schema and return the parsed object.
 * Returns null on any error so callers can fall back to canned data.
 */
export async function generateStructured<T = unknown>(
  prompt: string,
  schema: Record<string, unknown>,
  model: string = "gemini-2.5-flash",
): Promise<T | null> {
  const client = getGeminiClient();
  if (!client) return null;
  try {
    const response = await client.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        maxOutputTokens: 8192,
      },
    });
    const text = response.text ?? "";
    if (!text) return null;
    return JSON.parse(text) as T;
  } catch (err) {
    console.error("[gemini] generateStructured failed:", err);
    return null;
  }
}

export { Type };
