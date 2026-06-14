import { useEffect, useRef } from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      const scrolled = window.scrollY > 30;
      navRef.current.style.background = scrolled
        ? 'rgba(3, 0, 20, 0.85)'
        : 'transparent';
      navRef.current.style.borderBottomColor = scrolled
        ? 'rgba(124,58,237,0.2)'
        : 'transparent';
      navRef.current.style.backdropFilter = scrolled ? 'blur(24px)' : 'none';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 right-0 left-0 md:left-64 z-40 px-6 py-4 flex items-center justify-between transition-all duration-500"
      style={{ borderBottom: '1px solid transparent' }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center md:hidden shadow-lg shadow-violet-500/30">
          <HiOutlineSparkles className="text-white text-lg" />
        </div>
        <span className="text-sm font-semibold gradient-text hidden sm:block">CreatorCopilot AI</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="badge badge-violet hidden sm:flex">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          CC AI
        </span>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-500/30">
          C
        </div>
      </div>
    </nav>
  );
}
