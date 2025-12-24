import axios from "axios";
import { API_BASE_URL } from "../config";

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
    api.post('/api/auth/login', { email, password }),
  register: (email, password, full_name, state_name) =>
    api.post('/api/auth/register', { email, password, full_name, state_name }),
  verify: () => api.get('/api/auth/verify'),
};

export const ritualsAPI = {
  create: (ritual) => api.post('/api/rituals', ritual),
  getAll: (page = 1, limit = 9, filters = {}) =>
    api.get('/api/rituals', { params: { page, limit, ...filters } }),
  getById: (id) => api.get(`/api/rituals/${id}`),
  update: (id, ritual) => api.put(`/api/rituals/${id}`, ritual),
  delete: (id) => api.delete(`/api/rituals/${id}`),
  search: (query) => api.get('/api/rituals/search', { params: { q: query } }),
};

export const usersAPI = {
  getProfile: (id) => api.get(`/api/users/${id}`),
  updateProfile: (id, data) => api.put(`/api/users/${id}`, data),
  getMyProfile: () => api.get('/api/users/me/profile'),
  updateMyProfile: (data) => api.put('/api/users/me/profile', data),
  deleteProfile: () => api.delete('/api/users/me/delete'),
};

export const connectionsAPI = {
  follow: (userId) => api.post(`/api/connections/follow/${userId}`),
  unfollow: (userId) => api.delete(`/api/connections/follow/${userId}`),
  getFollowing: () => api.get('/api/connections/following'),
  getFollowers: () => api.get('/api/connections/followers'),
  getSimilarUsers: () => api.get('/api/connections/similar'),
};

export const categoriesAPI = {
  getAll: () => api.get('/api/categories'),
};

export const statesAPI = {
  getAll: () => api.get('/api/states'),
};

export default api;
