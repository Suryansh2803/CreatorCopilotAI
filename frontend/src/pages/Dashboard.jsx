import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeScene from '../components/ThreeScene';
import CountUp from '../components/CountUp';
import ScrollReveal from '../components/ScrollReveal';
import HealthBanner from '../components/HealthBanner';
import { getStats } from '../services/api';
import {
  HiOutlineUser, HiOutlineLightBulb, HiOutlineBriefcase,
  HiOutlineMail, HiOutlineShieldCheck, HiOutlineArrowRight,
  HiOutlineSparkles, HiOutlineTrendingUp, HiOutlineCollection
} from 'react-icons/hi';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { path: '/profile',      title: 'Profile Analyzer',     desc: 'AI-powered insights on your creator profile strength, growth tips & monetization.', icon: HiOutlineUser,        color: '#7C3AED', bg: 'rgba(124,58,237,0.1)' },
  { path: '/content',      title: 'Content Generator',    desc: 'Generate reel ideas, post concepts, hashtags & a full weekly content plan.', icon: HiOutlineLightBulb,   color: '#06B6D4', bg: 'rgba(6,182,212,0.1)' },
  { path: '/brands',       title: 'Brand Finder',         desc: 'Discover brands matching your niche & audience for sponsorship deals.', icon: HiOutlineBriefcase,   color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  { path: '/email',        title: 'Email Generator',      desc: 'Craft professional sponsorship outreach emails in one click.', icon: HiOutlineMail,        color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  { path: '/authenticity', title: 'Authenticity Checker', desc: 'Verify engagement rates & detect fake follower patterns instantly.', icon: HiOutlineShieldCheck, color: '#EC4899', bg: 'rgba(236,72,153,0.1)' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, counts: {}, recent: [] });
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    getStats().then(r => setStats(r.data)).catch(() => {});
  }, []);

  // Hero entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(titleRef.current, { opacity: 0, y: 40, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power3.out' }, '-=0.2')
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .fromTo(sceneRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=0.9');
  }, []);

  // Parallax on the 3D scene
  useEffect(() => {
    if (!sceneRef.current) return;
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => {
        gsap.set(sceneRef.current, { y: self.progress * 80, opacity: 1 - self.progress * 0.6 });
      }
    });
  }, []);

  // Staggered card animations
  useEffect(() => {
    gsap.fromTo('.feature-card', { opacity: 0, y: 60, scale: 0.92 }, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.7, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.features-grid', start: 'top 80%' }
    });
  }, []);

  const typeLabels = { profile: 'Profile', content: 'Content', brand: 'Brand', email: 'Email', authenticity: 'Authenticity' };
  const typeColors = { profile: '#7C3AED', content: '#06B6D4', brand: '#F59E0B', email: '#10B981', authenticity: '#EC4899' };

  return (
    <div className="max-w-7xl mx-auto space-y-24 pb-20">
      <HealthBanner />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center">
        <div className="flex-1 max-w-2xl">
          <div ref={badgeRef} className="opacity-0 mb-6">
            <span className="badge badge-violet">
              <HiOutlineSparkles size={12} />
              AI-Powered Creator Suite
            </span>
          </div>

          <h1 ref={titleRef} className="opacity-0 text-5xl md:text-7xl font-extrabold leading-none tracking-tight mb-6">
            <span className="gradient-text">Create.</span>
            <br />
            <span style={{ color: '#E2E8F0' }}>Grow.</span>
            <br />
            <span className="gradient-text">Monetize.</span>
          </h1>

          <p ref={subtitleRef} className="opacity-0 text-lg text-gray-400 max-w-lg leading-relaxed mb-8">
            Your AI copilot for content creation — analyze profiles, generate ideas, find brand deals, and verify authenticity with Gemini 2.5.
          </p>

          <Link to="/profile">
            <button className="btn-gradient text-base px-8 py-4">
              <span className="flex items-center gap-2">Get Started <HiOutlineArrowRight /></span>
            </button>
          </Link>
        </div>

        {/* 3D Scene */}
        <div ref={sceneRef} className="opacity-0 absolute right-0 top-1/2 -translate-y-1/2 w-[380px] h-[380px] hidden lg:block">
          <ThreeScene />
        </div>
      </section>

      {/* ── Glow divider ── */}
      <div className="glow-line" />

      {/* ── Stats ── */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 reveal">
          {[
            { label: 'Analyses Run', value: stats.total || 0, icon: HiOutlineTrendingUp, color: '#7C3AED', suffix: '+' },
            { label: 'AI Tools', value: 5, icon: HiOutlineSparkles, color: '#06B6D4' },
            { label: 'Models Used', value: 1, icon: HiOutlineCollection, color: '#EC4899', suffix: '' },
          ].map((s, i) => (
            <div key={i} className="glass-strong p-6 rounded-2xl flex items-center gap-5 gradient-border">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                <s.icon size={24} style={{ color: s.color }} />
              </div>
              <div>
                <div className="stat-number">
                  <CountUp target={s.value} />{s.suffix}
                </div>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── Feature Cards ── */}
      <section>
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8 reveal">
            <div>
              <h2 className="text-3xl font-bold text-white">AI Tools</h2>
              <p className="text-gray-500 mt-1">Everything you need to grow as a creator</p>
            </div>
            <div className="hidden sm:block glow-line w-32" />
          </div>
        </ScrollReveal>

        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <Link key={f.path} to={f.path} className="feature-card opacity-0">
              <div
                className="group glass-strong card-3d p-7 h-full flex flex-col rounded-2xl transition-all duration-400"
                style={{ border: `1px solid ${f.color}15` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: f.bg, border: `1px solid ${f.color}30` }}>
                  <f.icon size={26} style={{ color: f.color }} />
                </div>

                <h3 className="text-white font-bold text-xl mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{f.desc}</p>

                {/* Arrow */}
                <div className="flex items-center gap-2 mt-5 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                  style={{ color: f.color }}>
                  Open Tool <HiOutlineArrowRight />
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent Analyses ── */}
      {stats.recent.length > 0 && (
        <ScrollReveal>
          <section className="reveal">
            <h2 className="text-3xl font-bold text-white mb-8">Recent Analyses</h2>
            <div className="glass-strong rounded-2xl overflow-hidden gradient-border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <th className="text-left p-5 text-gray-500 font-medium">Type</th>
                      <th className="text-left p-5 text-gray-500 font-medium">Input Summary</th>
                      <th className="text-left p-5 text-gray-500 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent.map((item, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors"
                        style={{ borderBottom: i < stats.recent.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                        <td className="p-5">
                          <span className="badge" style={{
                            background: `${typeColors[item.type]}15`,
                            color: typeColors[item.type],
                            border: `1px solid ${typeColors[item.type]}30`
                          }}>
                            {typeLabels[item.type] || item.type}
                          </span>
                        </td>
                        <td className="p-5 text-gray-400 max-w-xs truncate font-mono text-xs">
                          {JSON.stringify(item.input).slice(0, 70)}…
                        </td>
                        <td className="p-5 text-gray-500 text-xs">
                          {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ── CTA section ── */}
      <ScrollReveal>
        <section className="reveal text-center py-16 relative overflow-hidden rounded-3xl glass-strong gradient-border">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold gradient-text mb-4">Ready to grow?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">Start with a profile analysis and unlock your full creator potential.</p>
            <Link to="/profile">
              <button className="btn-gradient text-base px-10 py-4">
                <span>Analyze My Profile</span>
              </button>
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
