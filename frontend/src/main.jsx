import React from 'react';
import ReactDOM from 'react-dom/client';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

// ── Lenis smooth scroll ──
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
  smoothWheel: true,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.5,
  infinite: false,
});

// Keep GSAP ScrollTrigger in sync with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Expose for any component that needs it (optional)
window.__lenis = lenis;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
