import { useState } from 'react';
import useApi from '../hooks/useApi';
import { matchBrands } from '../services/api';
import Loader from '../components/Loader';
import ResultCard from '../components/ResultCard';

const FIELDS = [
  { key: 'niche',        label: 'Niche',         placeholder: 'Tech, Fitness…' },
  { key: 'followers',    label: 'Followers',     placeholder: '50000', type: 'number' },
  { key: 'audienceType', label: 'Audience Type', placeholder: 'Gen Z, Professionals…' },
];

export default function BrandFinder() {
  const { data, loading, error, execute } = useApi(matchBrands);
  const [form, setForm] = useState({ niche: '', followers: '', audienceType: '' });
  const set = k => e => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="page-inner">
      {/* Header */}
      <div className="page-header">
        <div className="page-icon" style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 1 4 0"/>
          </svg>
        </div>
        <div>
          <h1 className="page-title">Brand Finder</h1>
          <p className="page-subtitle">Find perfect brand partnerships for your niche</p>
        </div>
      </div>

      {/* Form */}
      <form
        id="brand-finder-form"
        onSubmit={e => { e.preventDefault(); execute(form); }}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <div className="form-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {FIELDS.map(({ key, label, placeholder, type = 'text' }) => (
            <div key={key}>
              <label className="field-label" htmlFor={`brand-${key}`}>{label}</label>
              <input
                id={`brand-${key}`}
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
          <button type="submit" disabled={loading} className="btn-primary" id="brand-find-btn">
            {loading ? 'Searching…' : 'Find Brands'}
          </button>
        </div>
      </form>

      {error && <div className="error-banner" style={{ marginTop: 16 }}>{error}</div>}
      {loading && <Loader text="Finding matching brands…" />}

      {data?.brands && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <h2 className="section-heading">Matched Brands</h2>
            <div className="divider" style={{ flex: 1 }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontWeight: 600 }}>{data.brands.length} found</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
            {data.brands.map((b, i) => (
              <div key={i} className="result-card" style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div className="brand-initial">{b.name?.charAt(0)?.toUpperCase()}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{b.name}</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', lineHeight: 1.6 }}>{b.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
