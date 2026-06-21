import { useState } from 'react';
import useApi from '../hooks/useApi';
import { generateContent } from '../services/api';
import Loader from '../components/Loader';
import ResultCard from '../components/ResultCard';

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function ContentGenerator() {
  const { data, loading, error, execute } = useApi(generateContent);
  const [niche, setNiche] = useState('');

  return (
    <div className="page-inner">
      {/* Header */}
      <div className="page-header">
        <div className="page-icon" style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.25)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3 6H9C7.5 13.5 6 11.5 6 9a6 6 0 0 1 6-6z"/>
          </svg>
        </div>
        <div>
          <h1 className="page-title">Content Generator</h1>
          <p className="page-subtitle">Reels, posts, hashtags & weekly content plan</p>
        </div>
      </div>

      {/* Form */}
      <form
        id="content-generator-form"
        onSubmit={e => { e.preventDefault(); execute({ niche }); }}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <div className="form-card" style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label className="field-label" htmlFor="content-niche">Your Niche</label>
            <input
              id="content-niche"
              className="field-input"
              placeholder="Fitness, Tech, Cooking…"
              value={niche}
              onChange={e => setNiche(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary" id="content-generate-btn" style={{ flexShrink: 0 }}>
            {loading ? 'Generating…' : 'Generate Plan'}
          </button>
        </div>
      </form>

      {error && <div className="error-banner" style={{ marginTop: 16 }}>{error}</div>}
      {loading && <Loader text="Crafting your content plan…" />}

      {data && (
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {/* Reel Ideas */}
            <ResultCard title="Reel Ideas">
              {data.reelIdeas?.map((r, i) => (
                <div key={i} className="list-item">
                  <div className="list-item-num">{i + 1}</div>
                  <span>{r}</span>
                </div>
              ))}
            </ResultCard>

            {/* Post Ideas */}
            <ResultCard title="Post Ideas">
              {data.postIdeas?.map((p, i) => (
                <div key={i} className="list-item">
                  <div className="list-item-num">{i + 1}</div>
                  <span>{p}</span>
                </div>
              ))}
            </ResultCard>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {/* Hashtags */}
            <ResultCard title="Hashtags">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {data.hashtags?.map((h, i) => (
                  <span key={i} className="chip chip-blue">#{h.replace(/^#/, '')}</span>
                ))}
              </div>
            </ResultCard>

            {/* Weekly Plan */}
            <ResultCard title="Weekly Plan">
              {data.weeklyPlan?.map((d, i) => (
                <div key={i} className="list-item" style={{ alignItems: 'flex-start' }}>
                  <span className="chip chip-accent" style={{ flexShrink: 0, minWidth: 36, textAlign: 'center' }}>
                    {DAYS[i] ?? d.day}
                  </span>
                  <span style={{ lineHeight: 1.6 }}>{d.idea}</span>
                </div>
              ))}
            </ResultCard>
          </div>
        </div>
      )}
    </div>
  );
}
