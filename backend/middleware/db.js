import mongoose from 'mongoose';

let Analysis;
async function getModel() {
  if (!Analysis) Analysis = (await import('../models/Analysis.js')).default;
  return Analysis;
}

// Save to DB only if connected
async function saveAnalysis(type, input, output) {
  if (mongoose.connection.readyState !== 1) return;
  try {
    const Model = await getModel();
    await Model.create({ type, input, output });
  } catch (_) {} // non-fatal
}

export { saveAnalysis };
