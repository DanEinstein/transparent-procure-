import axios from 'axios';

// Base API configuration — always points to real backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Create axios instance with defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: async (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },
  logout: async () => {
    return apiClient.post('/auth/logout');
  },
  register: async (userData) => {
    return apiClient.post('/auth/register', userData);
  },
  refreshToken: async () => {
    return apiClient.post('/auth/refresh');
  },
  getCurrentUser: async () => {
    return apiClient.get('/auth/me');
  },
};

// Dashboard API endpoints
export const dashboardAPI = {
  getStats: async () => {
    return apiClient.get('/dashboard/stats');
  },
  getContractorScores: async () => {
    return apiClient.get('/dashboard/contractor-scores');
  },
  getAnomalies: async () => {
    return apiClient.get('/dashboard/anomalies');
  },
  getRecentActivities: async () => {
    return apiClient.get('/dashboard/recent-activities');
  },
  getWardFeed: async () => {
    return apiClient.get('/dashboard/ward-feed');
  },
};

// Feed API endpoints
export const feedAPI = {
  getWardFeed: async (wardId) => {
    return apiClient.get(`/feed/ward/${wardId}`);
  },
  getPosts: async (params) => {
    return apiClient.get('/feed/posts', { params });
  },
  createPost: async (postData) => {
    return apiClient.post('/feed/posts', postData);
  },
  updatePost: (postId, postData) => {
    return apiClient.put(`/feed/posts/${postId}`, postData);
  },
  deletePost: (postId) => {
    return apiClient.delete(`/feed/posts/${postId}`);
  },
  likePost: (postId) => {
    return apiClient.post(`/feed/posts/${postId}/like`);
  },
  commentOnPost: (postId, commentData) => {
    return apiClient.post(`/feed/posts/${postId}/comments`, commentData);
  },
};

// Registry API endpoints
export const registryAPI = {
  getContractors: async (params) => {
    return apiClient.get('/registry/contractors', { params });
  },
  getContractorDetails: async (contractorId) => {
    return apiClient.get(`/registry/contractors/${contractorId}`);
  },
  createContractor: async (contractorData) => {
    return apiClient.post('/registry/contractors', contractorData);
  },
  updateContractor: (contractorId, contractorData) => {
    return apiClient.put(`/registry/contractors/${contractorId}`, contractorData);
  },
  deleteContractor: (contractorId) => {
    return apiClient.delete(`/registry/contractors/${contractorId}`);
  },
  blacklistContractor: (contractorId, reason) => {
    return apiClient.post(`/registry/contractors/${contractorId}/blacklist`, { reason });
  },
  getBlacklistedContractors: () => {
    return apiClient.get('/registry/blacklisted');
  },
};

// Fraud Monitoring API endpoints
export const fraudAPI = {
  getAlerts: async (params) => {
    return apiClient.get('/fraud/alerts', { params });
  },
  getAlertDetails: async (alertId) => {
    return apiClient.get(`/fraud/alerts/${alertId}`);
  },
  createAlert: (alertData) => {
    return apiClient.post('/fraud/alerts', alertData);
  },
  updateAlert: (alertId, alertData) => {
    return apiClient.put(`/fraud/alerts/${alertId}`, alertData);
  },
  resolveAlert: (alertId) => {
    return apiClient.patch(`/fraud/alerts/${alertId}/resolve`);
  },
  getPatterns: () => {
    return apiClient.get('/fraud/patterns');
  },
  getRiskAssessment: (tenderId) => {
    return apiClient.get(`/fraud/risk-assessment/${tenderId}`);
  },
};

// Audit API endpoints
export const auditAPI = {
  getAudits: async (params) => {
    return apiClient.get('/audit/audits', { params });
  },
  getAuditDetails: (auditId) => {
    return apiClient.get(`/audit/audits/${auditId}`);
  },
  createAudit: (auditData) => {
    return apiClient.post('/audit/audits', auditData);
  },
  updateAudit: (auditId, auditData) => {
    return apiClient.put(`/audit/audits/${auditId}`, auditData);
  },
  getAuditTrail: (entityType, entityId) => {
    return apiClient.get(`/audit/trail/${entityType}/${entityId}`);
  },
  exportAuditReport: (params) => {
    return apiClient.get('/audit/export', { params });
  },
};

// Reports API endpoints
export const reportsAPI = {
  getReports: async (params) => {
    return apiClient.get('/reports', { params });
  },
  getReportDetails: (reportId) => {
    return apiClient.get(`/reports/${reportId}`);
  },
  generateReport: (reportData) => {
    return apiClient.post('/reports/generate', reportData);
  },
  exportReport: (reportId, format) => {
    return apiClient.get(`/reports/${reportId}/export`, {
      params: { format },
      responseType: 'blob'
    });
  },
  getReportTemplates: () => {
    return apiClient.get('/reports/templates');
  },
};

// Utility API endpoints
export const utilsAPI = {
  uploadFile: (file, folder) => {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) formData.append('folder', folder);
    return apiClient.post('/utils/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  search: async (query, filters) => {
    return apiClient.get('/utils/search', { params: { q: query, ...filters } });
  },
  getWardList: async () => {
    return apiClient.get('/utils/wards');
  },
  getCountyList: async () => {
    return apiClient.get('/utils/counties');
  },
};

export default apiClient;