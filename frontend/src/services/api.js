import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const submissionsAPI = {
  getAll: (params = {}) => api.get('/submissions', { params }),
  getById: (id) => api.get(`/submissions/${id}`),
  create: (data) => api.post('/submissions', data),
  update: (id, data) => api.put(`/submissions/${id}`, data),
  delete: (id) => api.delete(`/submissions/${id}`),
}

export const analyticsAPI = {
  getAggregated: (params = {}) => api.get('/analytics/aggregated', { params }),
  getDashboardStats: () => api.get('/analytics/dashboard'),
}

export default api

