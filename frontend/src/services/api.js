import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 60000,
});

export const analyzeProfile = (data) => API.post('/profile-analyze', data);
export const generateContent = (data) => API.post('/content-generate', data);
export const matchBrands = (data) => API.post('/brand-match', data);
export const generateEmail = (data) => API.post('/email-generate', data);
export const checkAuthenticity = (data) => API.post('/authenticity-check', data);
export const getStats = () => API.get('/stats');

export default API;
