import { useLocation } from 'react-router-dom';
import { MenuButton } from './Sidebar';

const ROUTE_LABELS = {
  '/':             'Overview',
  '/profile':      'Profile Analyzer',
  '/content':      'Content Generator',
  '/brands':       'Brand Finder',
  '/email':        'Email Generator',
  '/authenticity': 'Authenticity Checker',
};

export default function Navbar({ sidebarOpen, onToggleSidebar }) {
  const { pathname } = useLocation();
  const label = ROUTE_LABELS[pathname] ?? 'CreatorCopilot';

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <MenuButton open={sidebarOpen} onToggle={onToggleSidebar} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text)' }}>{label}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          padding: '4px 10px',
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-glow)',
          borderRadius: 5,
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
          Live
        </div>
        <div style={{
          width: 30, height: 30,
          borderRadius: 7,
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--text)',
          fontFamily: 'Syne, sans-serif',
        }}>C</div>
      </div>
    </header>
  );
}
