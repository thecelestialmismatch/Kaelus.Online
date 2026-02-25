import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('synqra_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('synqra_token');
      localStorage.removeItem('synqra_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Agents API
export const agentsAPI = {
  getTemplates: () => api.get('/agents/templates'),
  getAll: () => api.get('/agents'),
  getOne: (id) => api.get(`/agents/${id}`),
  create: (data) => api.post('/agents', data),
  update: (id, data) => api.put(`/agents/${id}`, data),
  delete: (id) => api.delete(`/agents/${id}`),
};

// Chat API
export const chatAPI = {
  send: (data) => api.post('/chat', data),
  getSessions: () => api.get('/chat/sessions'),
  getHistory: (sessionId) => api.get(`/chat/history/${sessionId}`),
  deleteSession: (sessionId) => api.delete(`/chat/sessions/${sessionId}`),
};

// Compliance API
export const complianceAPI = {
  scan: (text) => api.post('/compliance/scan', { text }),
  getLogs: () => api.get('/compliance/logs'),
};

// Analytics API
export const analyticsAPI = {
  getStats: () => api.get('/analytics/stats'),
  getActivity: () => api.get('/analytics/activity'),
};

// Payments API
export const paymentsAPI = {
  getPricing: () => api.get('/pricing'),
  createCheckout: (plan, originUrl) => api.post('/checkout', { plan, origin_url: originUrl }),
  getCheckoutStatus: (sessionId) => api.get(`/checkout/status/${sessionId}`),
};

export default api;
