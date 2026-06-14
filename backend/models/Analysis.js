import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['profile', 'content', 'brand', 'email', 'authenticity'] },
  input: { type: mongoose.Schema.Types.Mixed, required: true },
  output: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Analysis', analysisSchema);
