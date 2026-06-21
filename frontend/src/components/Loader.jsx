export default function Loader({ text = 'Generating with AI…' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', gap: 14 }}>
      <div className="loader-ring" />
      <div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-2)', textAlign: 'center' }}>{text}</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', textAlign: 'center', marginTop: 4 }}>This may take a few seconds</p>
      </div>
    </div>
  );
}
