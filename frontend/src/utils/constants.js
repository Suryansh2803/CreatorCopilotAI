import { HiOutlineUser, HiOutlineLightBulb, HiOutlineBriefcase, HiOutlineMail, HiOutlineShieldCheck } from 'react-icons/hi';

export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'dashboard' },
  { path: '/profile', label: 'Profile Analyzer', icon: 'profile' },
  { path: '/content', label: 'Content Generator', icon: 'content' },
  { path: '/brands', label: 'Brand Finder', icon: 'brand' },
  { path: '/email', label: 'Email Generator', icon: 'email' },
  { path: '/authenticity', label: 'Authenticity Checker', icon: 'auth' },
];

export const FEATURES = [
  { path: '/profile', title: 'Profile Analyzer', desc: 'Get AI-powered insights on your creator profile strength, growth tips, and monetization ideas.', icon: HiOutlineUser, color: '#8B5CF6' },
  { path: '/content', title: 'Content Generator', desc: 'Generate reel ideas, post concepts, hashtags, and a full weekly content plan.', icon: HiOutlineLightBulb, color: '#06B6D4' },
  { path: '/brands', title: 'Brand Finder', desc: 'Discover brands that match your niche and audience for sponsorship deals.', icon: HiOutlineBriefcase, color: '#F59E0B' },
  { path: '/email', title: 'Email Generator', desc: 'Craft professional sponsorship outreach emails in one click.', icon: HiOutlineMail, color: '#10B981' },
  { path: '/authenticity', title: 'Authenticity Checker', desc: 'Verify engagement rates and detect fake follower patterns.', icon: HiOutlineShieldCheck, color: '#EF4444' },
];
