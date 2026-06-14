import { saveAnalysis } from '../middleware/db.js';

export async function checkAuthenticity(req, res, next) {
  try {
    const { followers, avgLikes, avgComments } = req.body;
    if (!followers || avgLikes == null || avgComments == null) {
      return res.status(400).json({ error: 'All fields required: followers, avgLikes, avgComments' });
    }
    const f = Number(followers);
    const l = Number(avgLikes);
    const c = Number(avgComments);
    const engagementRate = ((l + c) / f) * 100;

    let riskLevel;
    if (engagementRate < 1) riskLevel = 'Very Poor';
    else if (engagementRate < 3) riskLevel = 'Low';
    else if (engagementRate < 6) riskLevel = 'Good';
    else riskLevel = 'Excellent';

    const authenticityScore = Math.min(100, Math.round(engagementRate * 15));
    const output = {
      engagementRate: Math.round(engagementRate * 100) / 100,
      authenticityScore,
      riskLevel
    };
    await saveAnalysis('authenticity', req.body, output);
    res.json(output);
  } catch (err) { next(err); }
}
