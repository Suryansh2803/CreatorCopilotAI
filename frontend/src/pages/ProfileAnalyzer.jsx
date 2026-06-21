import { useState } from 'react';
import useApi from '../hooks/useApi';
import { analyzeProfile } from '../services/api';
import Loader from '../components/Loader';
import AnimatedResultCard from '../components/AnimatedResultCard';
import GaugeChart from '../components/GaugeChart';

const FIELDS = [
  { key: 'name',      label: 'Creator Name',  placeholder: 'John Doe' },
  { key: 'niche',     label: 'Niche',         placeholder: 'Tech, Fitness, Cooking…' },
  { key: 'followers', label: 'Followers',     placeholder: '50000', type: 'number' },
  { key: 'bio',       label: 'Bio',           placeholder: 'A short bio about yourself…' },
];

const SECTIONS = [
  { key: 'strengths',              label: 'Strengths',         icon: '+', color: 'var(--emerald)' },
  { key: 'weaknesses',             label: 'Weaknesses',        icon: '−', color: 'var(--amber)' },
  { key: 'growthSuggestions',      label: 'Growth Tips',       icon: '↑', color: 'var(--accent)' },
  { key: 'monetizationSuggestions',label: 'Monetization',      icon: '$', color: 'var(--blue)' },
];

export default function ProfileAnalyzer() {
  const { data, loading, error, execute } = useApi(analyzeProfile);
  const [form, setForm] = useState({ name: '', niche: '', followers: '', bio: '' });
  const set = k => e => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="page-inner">
      {/* Header */}
      <div className="page-header">
        <div className="page-icon" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </div>
        <div>
          <h1 className="page-title">Profile Analyzer</h1>
          <p className="page-subtitle">AI insights on your creator strength & growth potential</p>
        </div>
      </div>

      {/* Form */}
      <form
        id="profile-analyzer-form"
        onSubmit={e => { e.preventDefault(); execute(form); }}
        style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
      >
        <div className="form-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {FIELDS.map(({ key, label, placeholder, type = 'text' }) => (
            <div key={key}>
              <label className="field-label" htmlFor={`profile-${key}`}>{label}</label>
              <input
                id={`profile-${key}`}
                className="field-input"
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={set(key)}
                required
              />
            </div>
          ))}
        </div>
        <div>
          <button type="submit" disabled={loading} className="btn-primary" id="profile-analyze-btn">
            {loading ? 'Analyzing…' : 'Analyze Profile'}
          </button>
        </div>
      </form>

      {/* States */}
      {error && <div className="error-banner" style={{ marginTop: 24 }}>{error}</div>}
      {loading && <Loader text="AI is analyzing your profile…" />}

      {/* Results */}
      {data && (
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Score gauge */}
          <AnimatedResultCard title="Profile Score" accentColor="#38bdf8" delay={0}>
            <GaugeChart value={data.score} label="Score / 100" color="var(--accent)" />
          </AnimatedResultCard>

          {/* 4-section grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {SECTIONS.map(({ key, label, icon, color }, idx) => (
              <AnimatedResultCard key={key} title={label} accentColor={color} delay={0.1 + idx * 0.1}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {data[key]?.map((item, i) => (
                    <div key={i} className="list-item">
                      <div className="list-item-dot" style={{ background: `${color}18`, color }}>{icon}</div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </AnimatedResultCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
