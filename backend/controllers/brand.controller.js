import { generateJSON } from '../services/gemini.service.js';
import { saveAnalysis } from '../middleware/db.js';

export async function matchBrands(req, res, next) {
  try {
    const { niche, followers, audienceType } = req.body;
    if (!niche || !followers || !audienceType) {
      return res.status(400).json({ error: 'All fields required: niche, followers, audienceType' });
    }
    const prompt = `Recommend 6 brands for ${niche} creator, ${followers} followers, audience ${audienceType}. Return JSON {brands:[{name:string,reason:string}]}`;
    const output = await generateJSON(prompt);
    await saveAnalysis('brand', req.body, output);
    res.json(output);
  } catch (err) { next(err); }
}
