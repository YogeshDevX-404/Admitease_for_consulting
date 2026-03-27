// import axios from 'axios';

// const API = axios.create({ baseURL: '/api' });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('admitease_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default API;


import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',   // 🔥 backend URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('admitease_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
