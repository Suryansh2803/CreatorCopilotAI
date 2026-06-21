import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from '../components/CountUp';
import HealthBanner from '../components/HealthBanner';
import { getStats } from '../services/api';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    path: '/profile',
    title: 'Profile Analyzer',
    desc: 'AI insights on your creator strength, growth tips & monetization opportunities.',
    tag: 'Analysis',
    tagClass: 'chip-accent',
    color: '#38bdf8',
  },
  {
    path: '/content',
    title: 'Content Generator',
    desc: 'Reel ideas, post concepts, hashtags & a full weekly content calendar.',
    tag: 'Generation',
    tagClass: 'chip-blue',
    color: '#60a5fa',
  },
  {
    path: '/brands',
    title: 'Brand Finder',
    desc: 'Discover brands aligned with your niche for sponsorship deals.',
    tag: 'Discovery',
    tagClass: 'chip-amber',
    color: '#f59e0b',
  },
  {
    path: '/email',
    title: 'Email Generator',
    desc: 'Professional sponsorship outreach emails crafted in one click.',
    tag: 'Outreach',
    tagClass: 'chip-emerald',
    color: '#34d399',
  },
  {
    path: '/authenticity',
    title: 'Authenticity Checker',
    desc: 'Verify engagement quality and detect fake follower patterns.',
    tag: 'Verification',
    tagClass: 'chip-rose',
    color: '#fb7185',
  },
];

const STATS = [
  { label: 'Analyses Run',   suffix: '+',  key: 'total' },
  { label: 'AI Tools',       value: 5                    },
  { label: 'AI Models',      value: 1                    },
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
    </svg>
  );
}

const TYPE_LABEL = { profile: 'Profile', content: 'Content', brand: 'Brand', email: 'Email', authenticity: 'Auth' };
const TYPE_CLASS  = { profile: 'chip-accent', content: 'chip-blue', brand: 'chip-amber', email: 'chip-emerald', authenticity: 'chip-rose' };

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, recent: [] });
  const gridRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    getStats().then(r => setStats(r.data)).catch(() => {});
  }, []);

  // ── Staggered card scroll animation ──
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.feature-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 48,
          scale: 0.95,
          rotateX: 6,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  // ── Stats row animation ──
  useEffect(() => {
    if (!statsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, statsRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="page-inner-wide">
      <HealthBanner />

      {/* ── Hero ── */}
      <div style={{ marginBottom: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ marginBottom: 8 }}>
          <span className="chip chip-accent" style={{ fontFamily: 'Syne, sans-serif' }}>AI Creator Suite</span>
        </div>
        <h1 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 850,
          color: 'var(--text)',
          lineHeight: 1.1,
          letterSpacing: '-0.035em',
          marginTop: 14,
          maxWidth: 700,
        }}>
          Your AI copilot<br />
          <span style={{ color: 'var(--accent)' }}>for creators.</span>
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-3)', marginTop: 16, maxWidth: 520, lineHeight: 1.65 }}>
          Analyze profiles, generate content, find brand deals, and verify authenticity .
        </p>
        <div style={{ marginTop: 24 }}>
          <Link to="/profile">
            <button className="btn-primary" id="dashboard-get-started">
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </Link>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 48 }}>
        {STATS.map((s, i) => (
          <div key={i} className="stat-box" style={{ opacity: 0 }}>
            <div className="stat-value">
              <CountUp target={s.value ?? stats.total ?? 0} />
              {s.suffix || ''}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Divider + section heading ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <h2 className="section-heading">Tools</h2>
        <div className="divider" style={{ flex: 1 }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{FEATURES.length} available</span>
      </div>

      {/* ── Feature grid ── */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 14,
          marginBottom: 48,
          perspective: '1200px',
        }}
      >
        {FEATURES.map(f => (
          <Link to={f.path} key={f.path} id={`dashboard-tool-${f.path.slice(1) || 'home'}`} style={{ textDecoration: 'none' }}>
            <div className="feature-card">
              <div className="feature-arrow" style={{ color: 'var(--text-3)' }}><ArrowIcon /></div>
              <div style={{ marginBottom: 14 }}>
                <span className={`chip ${f.tagClass}`}>{f.tag}</span>
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)', lineHeight: 1.65 }}>{f.desc}</p>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: f.color, fontWeight: 600 }}>Open tool</span>
                <div style={{ width: 20, height: 20, borderRadius: 5, background: `${f.color}18`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Recent Analyses ── */}
      {stats.recent?.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <h2 className="section-heading">Recent Activity</h2>
            <div className="divider" style={{ flex: 1 }} />
          </div>
          <div className="result-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Input</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent.map((item, i) => (
                  <tr key={i}>
                    <td><span className={`chip ${TYPE_CLASS[item.type] || 'chip-accent'}`}>{TYPE_LABEL[item.type] || item.type}</span></td>
                    <td style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {JSON.stringify(item.input).slice(0, 70)}…
                    </td>
                    <td style={{ color: 'var(--text-3)', fontSize: '0.75rem' }}>
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
