import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import BgVideo from './components/BgVideo';
import Dashboard from './pages/Dashboard';
import ProfileAnalyzer from './pages/ProfileAnalyzer';
import ContentGenerator from './pages/ContentGenerator';
import BrandFinder from './pages/BrandFinder';
import EmailGenerator from './pages/EmailGenerator';
import AuthenticityChecker from './pages/AuthenticityChecker';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <BgVideo />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="page-wrap">
        <Navbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(o => !o)} />
        <main>
          <Routes>
            <Route path="/"             element={<Dashboard />} />
            <Route path="/profile"      element={<ProfileAnalyzer />} />
            <Route path="/content"      element={<ContentGenerator />} />
            <Route path="/brands"       element={<BrandFinder />} />
            <Route path="/email"        element={<EmailGenerator />} />
            <Route path="/authenticity" element={<AuthenticityChecker />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
