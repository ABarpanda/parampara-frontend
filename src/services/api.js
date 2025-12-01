import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  register: (email, password, fullName, region) =>
    api.post('/auth/register', { email, password, fullName, region }),
  verify: () => api.get('/auth/verify'),
};

export const ritualsAPI = {
  create: (ritual) => api.post('/rituals', ritual),
  getAll: (page = 1, limit = 10, filters = {}) =>
    api.get('/rituals', { params: { page, limit, ...filters } }),
  getById: (id) => api.get(`/rituals/${id}`),
  update: (id, ritual) => api.put(`/rituals/${id}`, ritual),
  delete: (id) => api.delete(`/rituals/${id}`),
  search: (query) => api.get('/rituals/search', { params: { q: query } }),
};

export const usersAPI = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (id, data) => api.put(`/users/${id}`, data),
  getMyProfile: () => api.get('/users/me/profile'),
  updateMyProfile: (data) => api.put('/users/me/profile', data),
};

export const connectionsAPI = {
  follow: (userId) => api.post(`/connections/follow/${userId}`),
  unfollow: (userId) => api.delete(`/connections/follow/${userId}`),
  getFollowing: () => api.get('/connections/following'),
  getFollowers: () => api.get('/connections/followers'),
  getSimilarUsers: () => api.get('/connections/similar'),
};

export const categoriesAPI = {
  getAll: () => api.get('/categories'),
};

export default api;
