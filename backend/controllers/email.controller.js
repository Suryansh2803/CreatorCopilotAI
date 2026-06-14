import { generateJSON } from '../services/gemini.service.js';
import { saveAnalysis } from '../middleware/db.js';

export async function generateEmail(req, res, next) {
  try {
    const { name, niche, followers, brand } = req.body;
    if (!name || !niche || !followers || !brand) {
      return res.status(400).json({ error: 'All fields required: name, niche, followers, brand' });
    }
    const prompt = `Write professional sponsorship email. Creator:${name} Followers:${followers} Niche:${niche} Brand:${brand}. Return JSON {subject:string,body:string}`;
    const output = await generateJSON(prompt);
    await saveAnalysis('email', req.body, output);
    res.json(output);
  } catch (err) { next(err); }
}
