import { useState } from 'react';
import useApi from '../hooks/useApi';
import { generateEmail } from '../services/api';
import Loader from '../components/Loader';
import ResultCard from '../components/ResultCard';

const FIELDS = [
  { key: 'name',      label: 'Your Name',   placeholder: 'John Doe' },
  { key: 'niche',     label: 'Niche',       placeholder: 'Tech, Fitness…' },
  { key: 'followers', label: 'Followers',   placeholder: '50000', type: 'number' },
  { key: 'brand',     label: 'Brand Name',  placeholder: 'Nike, Apple…' },
];

function IconCopy() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}
function IconRefresh() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  );
}

export default function EmailGenerator() {
  const { data, loading, error, execute } = useApi(generateEmail);
  const [form, setForm] = useState({ name: '', niche: '', followers: '', brand: '' });
  const [copied, setCopied] = useState(false);
  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const copyEmail = () => {
    if (!data) return;
    navigator.clipboard.writeText(`Subject: ${data.subject}\n\n${data.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-inner">
      {/* Header */}
      <div className="page-header">
        <div className="page-icon" style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
          </svg>
        </div>
        <div>
          <h1 className="page-title">Email Generator</h1>
          <p className="page-subtitle">Professional sponsorship outreach emails in one click</p>
        </div>
      </div>

      {/* Form */}
      <form
        id="email-generator-form"
        onSubmit={e => { e.preventDefault(); execute(form); }}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <div className="form-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {FIELDS.map(({ key, label, placeholder, type = 'text' }) => (
            <div key={key}>
              <label className="field-label" htmlFor={`email-${key}`}>{label}</label>
              <input
                id={`email-${key}`}
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
          <button type="submit" disabled={loading} className="btn-primary" id="email-generate-btn">
            {loading ? 'Generating…' : 'Generate Email'}
          </button>
        </div>
      </form>

      {error && <div className="error-banner" style={{ marginTop: 16 }}>{error}</div>}
      {loading && <Loader text="Crafting your outreach email…" />}

      {data && (
        <div style={{ marginTop: 24 }}>
          <ResultCard>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div className="result-card-title" style={{ marginBottom: 0 }}>Generated Email</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={copyEmail} className="btn-ghost" id="email-copy-btn">
                  <IconCopy />{copied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={() => execute(form)} disabled={loading} className="btn-ghost" id="email-regen-btn">
                  <IconRefresh />Regenerate
                </button>
              </div>
            </div>

            {/* Subject */}
            <div className="email-section" style={{ marginBottom: 10 }}>
              <div className="email-label">Subject</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text)', fontWeight: 600 }}>{data.subject}</p>
            </div>

            {/* Body */}
            <div className="email-section">
              <div className="email-label">Body</div>
              <p style={{ fontSize: '0.8375rem', color: 'var(--text-2)', whiteSpace: 'pre-wrap', lineHeight: 1.75 }}>{data.body}</p>
            </div>
          </ResultCard>
        </div>
      )}
    </div>
  );
}
