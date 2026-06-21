import { useState } from 'react';
import useApi from '../hooks/useApi';
import { checkAuthenticity } from '../services/api';
import Loader from '../components/Loader';
import AnimatedResultCard from '../components/AnimatedResultCard';
import GaugeChart from '../components/GaugeChart';

const RISK_CONFIG = {
  'Very Poor': { color: '#ef4444', label: 'Very Poor',  tip: 'Likely fake engagement. Investigate immediately.' },
  'Low':       { color: '#f59e0b', label: 'Low',        tip: 'Below average. Focus on authentic engagement.' },
  'Good':      { color: '#34d399', label: 'Good',       tip: 'Healthy engagement. Keep creating great content.' },
  'Excellent': { color: '#38bdf8', label: 'Excellent',  tip: 'Outstanding! Your audience genuinely loves you.' },
};

const RISK_RANGES = [
  { range: '0–1%',  label: 'Very Poor', color: '#ef4444' },
  { range: '1–3%',  label: 'Low',       color: '#f59e0b' },
  { range: '3–6%',  label: 'Good',      color: '#34d399' },
  { range: '6%+',   label: 'Excellent', color: '#38bdf8' },
];

const FIELDS = [
  { key: 'followers',    label: 'Followers',     placeholder: '50000' },
  { key: 'avgLikes',     label: 'Avg Likes',     placeholder: '2500' },
  { key: 'avgComments',  label: 'Avg Comments',  placeholder: '150' },
];

export default function AuthenticityChecker() {
  const { data, loading, error, execute } = useApi(checkAuthenticity);
  const [form, setForm] = useState({ followers: '', avgLikes: '', avgComments: '' });
  const set = k => e => setForm({ ...form, [k]: e.target.value });
  const risk = data ? RISK_CONFIG[data.riskLevel] : null;

  return (
    <div className="page-inner">
      {/* Header */}
      <div className="page-header">
        <div className="page-icon" style={{ background: 'rgba(251,113,133,0.12)', border: '1px solid rgba(251,113,133,0.25)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--rose)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l7 3.5V10c0 5-3.5 8.5-7 10C8.5 18.5 5 15 5 10V5.5L12 2z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        </div>
        <div>
          <h1 className="page-title">Authenticity Checker</h1>
          <p className="page-subtitle">Detect fake followers & verify engagement quality</p>
        </div>
      </div>

      {/* Form */}
      <form
        id="authenticity-form"
        onSubmit={e => { e.preventDefault(); execute(form); }}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <div className="form-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {FIELDS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="field-label" htmlFor={`auth-${key}`}>{label}</label>
              <input
                id={`auth-${key}`}
                className="field-input"
                type="number"
                placeholder={placeholder}
                value={form[key]}
                onChange={set(key)}
                required
              />
            </div>
          ))}
        </div>
        <div>
          <button type="submit" disabled={loading} className="btn-primary" id="authenticity-check-btn">
            {loading ? 'Analyzing…' : 'Check Authenticity'}
          </button>
        </div>
      </form>

      {error && <div className="error-banner" style={{ marginTop: 16 }}>{error}</div>}
      {loading && <Loader text="Analyzing engagement patterns…" />}

      {data && risk && (
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Gauge row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <AnimatedResultCard title="Engagement Rate" accentColor={risk.color} delay={0}>
              <GaugeChart value={data.engagementRate} max={10} label="Rate %" color={risk.color} />
            </AnimatedResultCard>
            <AnimatedResultCard title="Authenticity Score" accentColor={risk.color} delay={0.1}>
              <GaugeChart value={data.authenticityScore} max={100} label="Score / 100" color={risk.color} />
            </AnimatedResultCard>
          </div>

          {/* Risk card */}
          <AnimatedResultCard title="Risk Assessment" accentColor={risk.color} delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 64, height: 64, flexShrink: 0,
                borderRadius: 12,
                background: `${risk.color}15`,
                border: `1px solid ${risk.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.25rem', fontWeight: 800,
                color: risk.color,
              }}>
                {data.authenticityScore}
              </div>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', marginBottom: 4 }}>{risk.label}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-3)', marginBottom: 12 }}>{risk.tip}</div>
                {/* Progress */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', flexShrink: 0 }}>Engagement: {data.engagementRate}%</span>
                  <div className="progress-track" style={{ flex: 1 }}>
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.min(data.engagementRate * 10, 100)}%`, background: risk.color }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Range grid */}
            <div className="risk-grid">
              {RISK_RANGES.map(({ range, label, color }) => (
                <div key={label} className="risk-cell" style={{ background: `${color}08`, borderColor: `${color}20` }}>
                  <div className="risk-range" style={{ color }}>{range}</div>
                  <div className="risk-label">{label}</div>
                </div>
              ))}
            </div>
          </AnimatedResultCard>
        </div>
      )}
    </div>
  );
}
