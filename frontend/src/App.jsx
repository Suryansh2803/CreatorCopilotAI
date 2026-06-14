import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import OrbField from './components/OrbField';
import CursorGlow from './components/CursorGlow';
import Dashboard from './pages/Dashboard';
import ProfileAnalyzer from './pages/ProfileAnalyzer';
import ContentGenerator from './pages/ContentGenerator';
import BrandFinder from './pages/BrandFinder';
import EmailGenerator from './pages/EmailGenerator';
import AuthenticityChecker from './pages/AuthenticityChecker';

gsap.registerPlugin(ScrollTrigger);

// Sync Lenis with GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <OrbField />
      <CursorGlow />
      <div className="flex min-h-screen grid-bg">
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-64">
          <Navbar />
          <main className="flex-1 p-4 md:p-8 pt-24">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<ProfileAnalyzer />} />
              <Route path="/content" element={<ContentGenerator />} />
              <Route path="/brands" element={<BrandFinder />} />
              <Route path="/email" element={<EmailGenerator />} />
              <Route path="/authenticity" element={<AuthenticityChecker />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
