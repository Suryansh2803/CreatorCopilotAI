import { useState } from 'react';
import useApi from '../hooks/useApi';
import { checkAuthenticity } from '../services/api';
import Loader from '../components/Loader';
import ResultCard from '../components/ResultCard';
import GaugeChart from '../components/GaugeChart';
import ScrollReveal from '../components/ScrollReveal';
import { HiOutlineShieldCheck } from 'react-icons/hi';

const RISK_CONFIG = {
  'Very Poor': { color: '#EF4444', label: '🔴 Very Poor', tip: 'Likely fake engagement. Investigate.' },
  'Low':       { color: '#F59E0B', label: '🟡 Low',       tip: 'Below average. Focus on engagement.' },
  'Good':      { color: '#10B981', label: '🟢 Good',      tip: 'Healthy engagement. Keep it up!' },
  'Excellent': { color: '#A78BFA', label: '✦ Excellent',  tip: 'Outstanding! Your audience loves you.' },
};

export default function AuthenticityChecker() {
  const { data, loading, error, execute } = useApi(checkAuthenticity);
  const [form, setForm] = useState({ followers: '', avgLikes: '', avgComments: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const risk = data ? RISK_CONFIG[data.riskLevel] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.3)' }}>
          <HiOutlineShieldCheck style={{ color: '#EC4899' }} size={22} />
        </div>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Authenticity Checker</h1>
          <p className="text-gray-500 text-sm">Detect fake followers & verify engagement</p>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); execute(form); }} className="glass-strong gradient-border p-7 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[['followers','Followers','50000'],['avgLikes','Avg Likes','2500'],['avgComments','Avg Comments','150']].map(([k,label,ph]) => (
            <div key={k}>
              <label className="text-sm text-gray-400 mb-2 block font-medium">{label}</label>
              <input className="input-glass" type="number" placeholder={ph} value={form[k]} onChange={set(k)} required />
            </div>
          ))}
        </div>
        <button type="submit" disabled={loading} className="btn-gradient w-full py-4">
          <span>{loading ? 'Checking...' : '✦ Check Authenticity'}</span>
        </button>
      </form>

      {error && <div className="glass-strong p-4 rounded-2xl text-red-400 text-sm">{error}</div>}
      {loading && <Loader text="Analyzing engagement patterns..." />}

      {data && risk && (
        <ScrollReveal className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 reveal">
            <ResultCard title="Engagement Rate">
              <GaugeChart value={data.engagementRate} max={10} label="Engagement %" color={risk.color} />
            </ResultCard>
            <ResultCard title="Authenticity Score">
              <GaugeChart value={data.authenticityScore} max={100} label="Score / 100" color={risk.color} />
            </ResultCard>
          </div>

          <div className="reveal">
            <ResultCard title="Risk Assessment">
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0"
                  style={{ background: `${risk.color}15`, border: `1px solid ${risk.color}30`, color: risk.color, boxShadow: `0 0 20px ${risk.color}20` }}>
                  {data.authenticityScore}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-xl mb-1">{risk.label}</p>
                  <p className="text-gray-400 text-sm mb-3">{risk.tip}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Engagement Rate</span>
                      <span style={{ color: risk.color }} className="font-semibold">{data.engagementRate}%</span>
                    </div>
                    <div className="w-full rounded-full h-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(data.engagementRate * 10, 100)}%`, background: `linear-gradient(90deg, ${risk.color}80, ${risk.color})` }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 grid grid-cols-4 gap-2 text-center text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                {[['0-1%','Very Poor','#EF4444'],['1-3%','Low','#F59E0B'],['3-6%','Good','#10B981'],['6%+','Excellent','#A78BFA']].map(([range, label, color]) => (
                  <div key={label} className="rounded-xl p-2" style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
                    <div className="font-bold" style={{ color }}>{range}</div>
                    <div className="text-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </ResultCard>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
