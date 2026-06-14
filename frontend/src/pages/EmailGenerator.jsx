import { useState } from 'react';
import useApi from '../hooks/useApi';
import { generateEmail } from '../services/api';
import Loader from '../components/Loader';
import ResultCard from '../components/ResultCard';
import { HiOutlineMail, HiOutlineClipboardCopy, HiOutlineRefresh } from 'react-icons/hi';

export default function EmailGenerator() {
  const { data, loading, error, execute } = useApi(generateEmail);
  const [form, setForm] = useState({ name: '', niche: '', followers: '', brand: '' });
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const copyEmail = () => {
    if (!data) return;
    navigator.clipboard.writeText(`Subject: ${data.subject}\n\n${data.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
          <HiOutlineMail style={{ color: '#10B981' }} size={22} />
        </div>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Email Generator</h1>
          <p className="text-gray-500 text-sm">Professional sponsorship outreach emails</p>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); execute(form); }} className="glass-strong gradient-border p-7 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[['name','Your Name','John Doe'],['niche','Niche','Tech, Fitness...'],['followers','Followers','50000'],['brand','Brand Name','Nike, Apple...']].map(([k,label,ph]) => (
            <div key={k}>
              <label className="text-sm text-gray-400 mb-2 block font-medium">{label}</label>
              <input className="input-glass" placeholder={ph} value={form[k]} onChange={set(k)} required type={k==='followers'?'number':'text'} />
            </div>
          ))}
        </div>
        <button type="submit" disabled={loading} className="btn-gradient w-full py-4">
          <span>{loading ? 'Generating...' : '✦ Generate Email'}</span>
        </button>
      </form>

      {error && <div className="glass-strong p-4 rounded-2xl text-red-400 text-sm">{error}</div>}
      {loading && <Loader text="Crafting your email..." />}

      {data && (
        <ResultCard>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold gradient-text-2">Generated Email</h3>
            <div className="flex gap-2">
              <button onClick={copyEmail} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: '#9CA3AF' }}>
                <HiOutlineClipboardCopy />{copied ? '✓ Copied!' : 'Copy'}
              </button>
              <button onClick={() => execute(form)} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all" style={{ background: 'rgba(124,58,237,0.15)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.25)' }}>
                <HiOutlineRefresh />Regenerate
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-xs text-gray-600 mb-1 uppercase tracking-widest">Subject</p>
              <p className="text-white font-semibold">{data.subject}</p>
            </div>
            <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-xs text-gray-600 mb-2 uppercase tracking-widest">Body</p>
              <p className="text-gray-300 whitespace-pre-wrap leading-loose text-sm">{data.body}</p>
            </div>
          </div>
        </ResultCard>
      )}
    </div>
  );
}
