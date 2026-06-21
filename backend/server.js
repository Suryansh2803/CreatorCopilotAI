import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import profileRoutes from './routes/profile.routes.js';
import contentRoutes from './routes/content.routes.js';
import brandRoutes from './routes/brand.routes.js';
import emailRoutes from './routes/email.routes.js';
import authenticityRoutes from './routes/authenticity.routes.js';

dotenv.config();

// Validate required env vars
if (!process.env.GROQ_API_KEY) {
  console.warn('\n⚠️  WARNING: GROQ_API_KEY is not set in backend/.env');
  console.warn('   AI features will fail. Get a free key at https://console.groq.com/\n');
} else {
  console.log('✅ Groq API key loaded');
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', profileRoutes);
app.use('/api', contentRoutes);
app.use('/api', brandRoutes);
app.use('/api', emailRoutes);
app.use('/api', authenticityRoutes);

app.get('/api/stats', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ total: 0, counts: {}, recent: [] });
    }
    const Analysis = (await import('./models/Analysis.js')).default;
    const [total, recent, typeCounts] = await Promise.all([
      Analysis.countDocuments(),
      Analysis.find().sort({ createdAt: -1 }).limit(5).lean(),
      Analysis.aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }])
    ]);
    const counts = {};
    typeCounts.forEach(t => { counts[t._id] = t.count; });
    res.json({ total, counts, recent });
  } catch (err) { next(err); }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    groq: (!process.env.GROQ_API_KEY) ? 'NOT SET' : 'configured'
  });
});

app.use(errorHandler);

// Start server immediately — don't block on MongoDB
app.listen(PORT, () => console.log(`\n🚀 Server running on http://localhost:${PORT}`));

// Connect to MongoDB in background
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('⚠️  MongoDB not connected (analyses won\'t save):', err.message));
