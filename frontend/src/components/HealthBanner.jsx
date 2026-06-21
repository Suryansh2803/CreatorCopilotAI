import { useEffect, useState } from 'react';

export default function HealthBanner() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/health')
      .then(r => r.json())
      .then(setHealth)
      .catch(() => setHealth({ status: 'unreachable' }));
  }, []);

  if (!health || (health.groq === 'configured' && health.mongodb === 'connected')) return null;

  return (
    <div className="health-banner">
      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fbbf24', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Setup Required
      </p>
      <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {health.status === 'unreachable' && (
          <li style={{ fontSize: '0.8rem', color: '#d6b99a' }}>
            Backend not running — run <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 4, fontSize: '0.75rem' }}>npm run dev</code> in the <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 4, fontSize: '0.75rem' }}>backend/</code> folder
          </li>
        )}
        {health.groq === 'NOT SET' && (
          <li style={{ fontSize: '0.8rem', color: '#d6b99a' }}>
            GROQ_API_KEY missing — add it to <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 4, fontSize: '0.75rem' }}>backend/.env</code>
          </li>
        )}
        {health.mongodb === 'disconnected' && (
          <li style={{ fontSize: '0.8rem', color: '#d6b99a' }}>
            MongoDB not connected — analyses won't be saved. Set MONGODB_URI in <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 4, fontSize: '0.75rem' }}>backend/.env</code>
          </li>
        )}
      </ul>
    </div>
  );
}
