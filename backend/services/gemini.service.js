import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
  { model: 'gemini-1.5-flash' },
  { apiVersion: 'v1' }
);

export async function generateJSON(prompt) {
  const fullPrompt = `${prompt}\n\nIMPORTANT: Return ONLY valid JSON. No markdown fences, no explanation, no extra text.`;
  const result = await model.generateContent(fullPrompt);
  const text = result.response.text().trim();
  // Strip markdown fences if model includes them anyway
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  return JSON.parse(cleaned);
}
