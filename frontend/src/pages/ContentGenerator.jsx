import { useState } from 'react';
import useApi from '../hooks/useApi';
import { generateContent } from '../services/api';
import Loader from '../components/Loader';
import ResultCard from '../components/ResultCard';
import ScrollReveal from '../components/ScrollReveal';
import { HiOutlineLightBulb } from 'react-icons/hi';

export default function ContentGenerator() {
  const { data, loading, error, execute } = useApi(generateContent);
  const [niche, setNiche] = useState('');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)' }}>
          <HiOutlineLightBulb style={{ color: '#06B6D4' }} size={22} />
        </div>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Content Generator</h1>
          <p className="text-gray-500 text-sm">Reels, posts, hashtags & weekly plan</p>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); execute({ niche }); }} className="glass-strong gradient-border p-7 flex flex-col sm:flex-row gap-5">
        <div className="flex-1">
          <label className="text-sm text-gray-400 mb-2 block font-medium">Your Niche</label>
          <input className="input-glass" placeholder="Fitness, Tech, Cooking..." value={niche} onChange={e => setNiche(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="btn-gradient self-end h-[50px] px-8 whitespace-nowrap">
          <span>{loading ? 'Generating...' : '✦ Generate'}</span>
        </button>
      </form>

      {error && <div className="glass-strong p-4 rounded-2xl text-red-400 text-sm">{error}</div>}
      {loading && <Loader text="Crafting your content plan..." />}

      {data && (
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="reveal">
            <ResultCard title="🎬 Reel Ideas">
              <ol className="space-y-2 list-decimal list-inside">
                {data.reelIdeas?.map((r, i) => <li key={i} className="text-sm text-gray-300">{r}</li>)}
              </ol>
            </ResultCard>
          </div>
          <div className="reveal">
            <ResultCard title="📝 Post Ideas">
              <ol className="space-y-2 list-decimal list-inside">
                {data.postIdeas?.map((p, i) => <li key={i} className="text-sm text-gray-300">{p}</li>)}
              </ol>
            </ResultCard>
          </div>
          <div className="reveal">
            <ResultCard title="# Hashtags">
              <div className="flex flex-wrap gap-2">
                {data.hashtags?.map((h, i) => (
                  <span key={i} className="badge badge-cyan">#{h.replace(/^#/, '')}</span>
                ))}
              </div>
            </ResultCard>
          </div>
          <div className="reveal">
            <ResultCard title="📅 Weekly Plan">
              <div className="space-y-3">
                {data.weeklyPlan?.map((d, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="badge badge-violet shrink-0 min-w-[56px] justify-center">{d.day}</span>
                    <p className="text-sm text-gray-300">{d.idea}</p>
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
