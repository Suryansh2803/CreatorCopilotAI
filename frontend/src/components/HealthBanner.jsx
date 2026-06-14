import { useEffect, useState } from 'react';
import { getStats } from '../services/api';

// Displays a warning banner if the backend health check shows Gemini/DB issues
export default function HealthBanner() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/health')
      .then(r => r.json())
      .then(setHealth)
      .catch(() => setHealth({ status: 'unreachable' }));
  }, []);

  if (!health || (health.gemini === 'configured' && health.mongodb === 'connected')) return null;

  return (
    <div className="glass border-amber-500/30 p-4 mb-6 rounded-xl">
      <p className="text-amber-400 font-semibold text-sm mb-2">⚠️ Setup Required</p>
      <ul className="space-y-1 text-sm text-gray-300">
        {health.status === 'unreachable' && (
          <li>❌ <strong>Backend not running</strong> — run <code className="bg-white/10 px-1 rounded">npm run dev</code> in the <code className="bg-white/10 px-1 rounded">backend/</code> folder</li>
        )}
        {health.gemini === 'NOT SET' && (
          <li>❌ <strong>GEMINI_API_KEY missing</strong> — add your key to <code className="bg-white/10 px-1 rounded">backend/.env</code>. Get free key at <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-primary underline">aistudio.google.com</a></li>
        )}
        {health.mongodb === 'disconnected' && (
          <li>⚠️ <strong>MongoDB not connected</strong> — analyses won't be saved. Set <code className="bg-white/10 px-1 rounded">MONGODB_URI</code> in <code className="bg-white/10 px-1 rounded">backend/.env</code> (free tier: <a href="https://cloud.mongodb.com" target="_blank" rel="noreferrer" className="text-primary underline">MongoDB Atlas</a>)</li>
        )}
      </ul>
    </div>
  );
}
