import { useState } from 'react';
import useApi from '../hooks/useApi';
import { analyzeProfile } from '../services/api';
import Loader from '../components/Loader';
import ResultCard from '../components/ResultCard';
import GaugeChart from '../components/GaugeChart';
import ScrollReveal from '../components/ScrollReveal';
import { HiOutlineUser } from 'react-icons/hi';

export default function ProfileAnalyzer() {
  const { data, loading, error, execute } = useApi(analyzeProfile);
  const [form, setForm] = useState({ name: '', niche: '', followers: '', bio: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
            <HiOutlineUser style={{ color: '#A78BFA' }} size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Profile Analyzer</h1>
            <p className="text-gray-500 text-sm">AI insights on your creator strength</p>
          </div>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); execute(form); }} className="glass-strong gradient-border p-7 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[['name','Creator Name','John Doe'],['niche','Niche','Tech, Fitness...'],['followers','Followers','50000'],['bio','Bio','Short bio...']].map(([k,label,ph]) => (
            <div key={k}>
              <label className="text-sm text-gray-400 mb-2 block font-medium">{label}</label>
              <input className="input-glass" placeholder={ph} value={form[k]} onChange={set(k)} required type={k==='followers'?'number':'text'} />
            </div>
          ))}
        </div>
        <button type="submit" disabled={loading} className="btn-gradient w-full text-base py-4">
          <span>{loading ? 'Analyzing...' : '✦ Analyze Profile'}</span>
        </button>
      </form>

      {error && <div className="glass-strong p-4 rounded-2xl text-red-400 text-sm" style={{ border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>}
      {loading && <Loader text="Gemini is analyzing your profile..." />}

      {data && (
        <ScrollReveal className="space-y-5">
          <div className="reveal">
            <ResultCard title="Profile Score">
              <GaugeChart value={data.score} label="Profile Score" color="#A78BFA" />
            </ResultCard>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { key:'strengths', title:'💪 Strengths', icon:'✓', color:'#10B981', cls:'reveal-left' },
              { key:'weaknesses', title:'⚠️ Weaknesses', icon:'!', color:'#F59E0B', cls:'reveal-right' },
              { key:'growthSuggestions', title:'🚀 Growth Tips', icon:'→', color:'#A78BFA', cls:'reveal-left' },
              { key:'monetizationSuggestions', title:'💰 Monetization', icon:'$', color:'#F59E0B', cls:'reveal-right' },
            ].map(({ key, title, icon, color, cls }) => (
              <div key={key} className={cls}>
                <ResultCard title={title}>
                  <ul className="space-y-3">
                    {data[key]?.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="text-xs font-bold mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: `${color}20`, color }}>{icon}</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </ResultCard>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
