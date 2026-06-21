import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateJSON(prompt) {
  const fullPrompt = `${prompt}\n\nIMPORTANT: Return ONLY valid JSON. No markdown fences, no explanation, no extra text.`;
  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: fullPrompt }],
    model: 'llama-3.1-8b-instant',
    temperature: 0.7,
  });
  const text = completion.choices[0]?.message?.content?.trim() || '';
  // Strip markdown fences if model includes them anyway
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  return JSON.parse(cleaned);
}
