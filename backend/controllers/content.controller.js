import { generateJSON } from '../services/gemini.service.js';
import { saveAnalysis } from '../middleware/db.js';

export async function generateContent(req, res, next) {
  try {
    const { niche } = req.body;
    if (!niche) return res.status(400).json({ error: 'niche is required' });
    const prompt = `For a ${niche} creator, return JSON {reelIdeas:string[10], postIdeas:string[10], hashtags:string[10], weeklyPlan:[{day:string,idea:string}] with 7 entries for Mon-Sun}`;
    const output = await generateJSON(prompt);
    await saveAnalysis('content', req.body, output);
    res.json(output);
  } catch (err) { next(err); }
}
