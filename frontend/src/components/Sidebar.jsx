import { NavLink } from 'react-router-dom';
import {
  HiOutlineSparkles, HiOutlineHome, HiOutlineUser,
  HiOutlineLightBulb, HiOutlineBriefcase, HiOutlineMail,
  HiOutlineShieldCheck, HiOutlineMenuAlt3, HiOutlineX
} from 'react-icons/hi';
import { useState } from 'react';

const links = [
  { to: '/', icon: HiOutlineHome, label: 'Dashboard', color: '#A78BFA' },
  { to: '/profile', icon: HiOutlineUser, label: 'Profile Analyzer', color: '#7C3AED' },
  { to: '/content', icon: HiOutlineLightBulb, label: 'Content Generator', color: '#06B6D4' },
  { to: '/brands', icon: HiOutlineBriefcase, label: 'Brand Finder', color: '#F59E0B' },
  { to: '/email', icon: HiOutlineMail, label: 'Email Generator', color: '#10B981' },
  { to: '/authenticity', icon: HiOutlineShieldCheck, label: 'Authenticity', color: '#EC4899' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden w-10 h-10 rounded-xl glass-strong flex items-center justify-center"
        style={{ color: '#A78BFA' }}
      >
        {open ? <HiOutlineX size={20} /> : <HiOutlineMenuAlt3 size={20} />}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(3,0,20,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 flex flex-col transition-transform duration-400 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{
          background: 'rgba(3, 0, 20, 0.8)',
          backdropFilter: 'blur(30px)',
          borderRight: '1px solid rgba(124,58,237,0.12)',
        }}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center relative"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', boxShadow: '0 0 20px rgba(124,58,237,0.5)' }}
          >
            <HiOutlineSparkles className="text-white text-xl" />
          </div>
          <div>
            <h2 className="font-bold text-white text-base leading-tight">CreatorCopilot</h2>
            <p className="text-[10px] tracking-widest uppercase" style={{ color: '#6D28D9' }}>AI Suite</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto no-scrollbar">
          {links.map(({ to, icon: Icon, label, color }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${isActive
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-200'
                }`
              }
              style={({ isActive }) => isActive ? {
                background: `${color}18`,
                boxShadow: `0 0 0 1px ${color}30, inset 0 0 20px ${color}08`,
              } : {}}
            >
              {({ isActive }) => (
                <>
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={isActive
                      ? { background: `${color}25`, color }
                      : { color: '#4B5563' }
                    }
                  >
                    <Icon size={18} />
                  </div>
                  <span>{label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 m-3 mb-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))', border: '1px solid rgba(124,58,237,0.12)' }}>
          <p className="text-xs text-gray-500 mb-0.5">Powered by</p>
          <p className="text-sm font-semibold gradient-text">CC AI</p>
          <div className="glow-line mt-2 rounded-full" />
        </div>
      </aside>
    </>
  );
}
