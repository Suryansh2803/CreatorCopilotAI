import { generateJSON } from '../services/gemini.service.js';
import { saveAnalysis } from '../middleware/db.js';

export async function analyzeProfile(req, res, next) {
  try {
    const { name, niche, followers, bio } = req.body;
    if (!name || !niche || !followers || !bio) {
      return res.status(400).json({ error: 'All fields required: name, niche, followers, bio' });
    }
    const prompt = `Analyze creator profile, return JSON {score:0-100, strengths:string[], weaknesses:string[], growthSuggestions:string[], monetizationSuggestions:string[]}. Name:${name} Niche:${niche} Followers:${followers} Bio:${bio}`;
    const output = await generateJSON(prompt);
    await saveAnalysis('profile', req.body, output);
    res.json(output);
  } catch (err) { next(err); }
}
