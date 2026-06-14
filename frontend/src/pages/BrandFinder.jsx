import { useState } from 'react';
import useApi from '../hooks/useApi';
import { matchBrands } from '../services/api';
import Loader from '../components/Loader';
import ResultCard from '../components/ResultCard';
import ScrollReveal from '../components/ScrollReveal';
import { HiOutlineBriefcase } from 'react-icons/hi';

export default function BrandFinder() {
  const { data, loading, error, execute } = useApi(matchBrands);
  const [form, setForm] = useState({ niche: '', followers: '', audienceType: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}>
          <HiOutlineBriefcase style={{ color: '#F59E0B' }} size={22} />
        </div>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Brand Finder</h1>
          <p className="text-gray-500 text-sm">Find your perfect brand partnerships</p>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); execute(form); }} className="glass-strong gradient-border p-7 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[['niche','Niche','Tech, Fitness...'],['followers','Followers','50000'],['audienceType','Audience Type','Gen Z, Professionals...']].map(([k,label,ph]) => (
            <div key={k}>
              <label className="text-sm text-gray-400 mb-2 block font-medium">{label}</label>
              <input className="input-glass" placeholder={ph} value={form[k]} onChange={set(k)} required type={k==='followers'?'number':'text'} />
            </div>
          ))}
        </div>
        <button type="submit" disabled={loading} className="btn-gradient w-full py-4">
          <span>{loading ? 'Searching...' : '✦ Find Brands'}</span>
        </button>
      </form>

      {error && <div className="glass-strong p-4 rounded-2xl text-red-400 text-sm">{error}</div>}
      {loading && <Loader text="Finding matching brands..." />}

      {data?.brands && (
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.brands.map((b, i) => (
            <div key={i} className="reveal-scale">
              <ResultCard>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-amber-400 font-bold text-xl shrink-0"
                    style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
                    {b.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">{b.name}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{b.reason}</p>
                  </div>
                </div>
              </ResultCard>
            </div>
          ))}
        </ScrollReveal>
      )}
    </div>
  );
}
