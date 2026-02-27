import axios from 'axios';
import mockAPI from './mockService';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Check if backend is available by attempting to reach the API
const isBackendAvailable = async () => {
  if (import.meta.env.VITE_USE_MOCK_API === 'true') {
    return false; // Force use of mock API
  }

  try {
    // Attempt to reach the API with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.warn('Backend not available, using mock API:', error.message);
    return false;
  }
};

let backendAvailable = false;

// Initialize the availability check
isBackendAvailable().then(available => {
  backendAvailable = available;
  console.log(`Using ${available ? 'real' : 'mock'} API service`);
});

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

// Function to determine whether to use real API or mock API
const useRealAPI = () => {
  return backendAvailable && import.meta.env.VITE_USE_MOCK_API !== 'true';
};

// Auth API endpoints
export const authAPI = {
  login: async (credentials) => {
    if (useRealAPI()) {
      return apiClient.post('/auth/login', credentials);
    } else {
      return mockAPI.auth.login(credentials);
    }
  },
  logout: async () => {
    if (useRealAPI()) {
      return apiClient.post('/auth/logout');
    } else {
      return mockAPI.auth.logout();
    }
  },
  register: async (userData) => {
    if (useRealAPI()) {
      return apiClient.post('/auth/register', userData);
    } else {
      // Mock API doesn't have register endpoint yet, return error
      return {
        success: false,
        statusCode: 404,
        message: 'Register endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      };
    }
  },
  refreshToken: async () => {
    if (useRealAPI()) {
      return apiClient.post('/auth/refresh');
    } else {
      // Mock API doesn't have refresh endpoint, return error
      return {
        success: false,
        statusCode: 404,
        message: 'Refresh endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      };
    }
  },
  getCurrentUser: async () => {
    if (useRealAPI()) {
      return apiClient.get('/auth/me');
    } else {
      return mockAPI.auth.getCurrentUser();
    }
  },
};

// Dashboard API endpoints
export const dashboardAPI = {
  getStats: async () => {
    if (useRealAPI()) {
      return apiClient.get('/dashboard/stats');
    } else {
      return mockAPI.dashboard.getStats();
    }
  },
  getContractorScores: async () => {
    if (useRealAPI()) {
      return apiClient.get('/dashboard/contractor-scores');
    } else {
      return mockAPI.dashboard.getContractorScores();
    }
  },
  getAnomalies: async () => {
    if (useRealAPI()) {
      return apiClient.get('/dashboard/anomalies');
    } else {
      return mockAPI.dashboard.getAnomalies();
    }
  },
  getRecentActivities: async () => {
    if (useRealAPI()) {
      return apiClient.get('/dashboard/recent-activities');
    } else {
      return mockAPI.dashboard.getRecentActivities();
    }
  },
  getWardFeed: async () => {
    if (useRealAPI()) {
      return apiClient.get('/dashboard/ward-feed');
    } else {
      return mockAPI.dashboard.getWardFeed();
    }
  },
};

// Feed API endpoints
export const feedAPI = {
  getWardFeed: async (wardId) => {
    if (useRealAPI()) {
      return apiClient.get(`/feed/ward/${wardId}`);
    } else {
      return mockAPI.feed.getWardFeed(wardId);
    }
  },
  getPosts: async (params) => {
    if (useRealAPI()) {
      return apiClient.get('/feed/posts', { params });
    } else {
      return mockAPI.feed.getPosts(params);
    }
  },
  createPost: async (postData) => {
    if (useRealAPI()) {
      return apiClient.post('/feed/posts', postData);
    } else {
      return mockAPI.feed.createPost(postData);
    }
  },
  updatePost: (postId, postData) => {
    if (useRealAPI()) {
      return apiClient.put(`/feed/posts/${postId}`, postData);
    } else {
      // Mock API doesn't have update endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Update post endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  deletePost: (postId) => {
    if (useRealAPI()) {
      return apiClient.delete(`/feed/posts/${postId}`);
    } else {
      // Mock API doesn't have delete endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Delete post endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  likePost: (postId) => {
    if (useRealAPI()) {
      return apiClient.post(`/feed/posts/${postId}/like`);
    } else {
      // Mock API doesn't have like endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Like post endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  commentOnPost: (postId, commentData) => {
    if (useRealAPI()) {
      return apiClient.post(`/feed/posts/${postId}/comments`, commentData);
    } else {
      // Mock API doesn't have comment endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Comment on post endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
};

// Registry API endpoints
export const registryAPI = {
  getContractors: async (params) => {
    if (useRealAPI()) {
      return apiClient.get('/registry/contractors', { params });
    } else {
      return mockAPI.registry.getContractors(params);
    }
  },
  getContractorDetails: async (contractorId) => {
    if (useRealAPI()) {
      return apiClient.get(`/registry/contractors/${contractorId}`);
    } else {
      return mockAPI.registry.getContractorDetails(contractorId);
    }
  },
  createContractor: async (contractorData) => {
    if (useRealAPI()) {
      return apiClient.post('/registry/contractors', contractorData);
    } else {
      return mockAPI.registry.createContractor(contractorData);
    }
  },
  updateContractor: (contractorId, contractorData) => {
    if (useRealAPI()) {
      return apiClient.put(`/registry/contractors/${contractorId}`, contractorData);
    } else {
      // Mock API doesn't have update endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Update contractor endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  deleteContractor: (contractorId) => {
    if (useRealAPI()) {
      return apiClient.delete(`/registry/contractors/${contractorId}`);
    } else {
      // Mock API doesn't have delete endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Delete contractor endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  blacklistContractor: (contractorId, reason) => {
    if (useRealAPI()) {
      return apiClient.post(`/registry/contractors/${contractorId}/blacklist`, { reason });
    } else {
      // Mock API doesn't have blacklist endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Blacklist contractor endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  getBlacklistedContractors: () => {
    if (useRealAPI()) {
      return apiClient.get('/registry/blacklisted');
    } else {
      // Mock API doesn't have this endpoint yet, return empty list
      return Promise.resolve({
        success: true,
        statusCode: 200,
        message: 'Blacklisted contractors retrieved',
        data: [],
        timestamp: new Date().toISOString()
      });
    }
  },
};

// Fraud Monitoring API endpoints
export const fraudAPI = {
  getAlerts: async (params) => {
    if (useRealAPI()) {
      return apiClient.get('/fraud/alerts', { params });
    } else {
      return mockAPI.fraud.getAlerts(params);
    }
  },
  getAlertDetails: async (alertId) => {
    if (useRealAPI()) {
      return apiClient.get(`/fraud/alerts/${alertId}`);
    } else {
      return mockAPI.fraud.getAlertDetails(alertId);
    }
  },
  createAlert: (alertData) => {
    if (useRealAPI()) {
      return apiClient.post('/fraud/alerts', alertData);
    } else {
      // Mock API doesn't have create alert endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Create fraud alert endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  updateAlert: (alertId, alertData) => {
    if (useRealAPI()) {
      return apiClient.put(`/fraud/alerts/${alertId}`, alertData);
    } else {
      // Mock API doesn't have update endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Update fraud alert endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  resolveAlert: (alertId) => {
    if (useRealAPI()) {
      return apiClient.patch(`/fraud/alerts/${alertId}/resolve`);
    } else {
      // Mock API doesn't have resolve endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Resolve fraud alert endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  getPatterns: () => {
    if (useRealAPI()) {
      return apiClient.get('/fraud/patterns');
    } else {
      // Mock API doesn't have this endpoint, return empty list
      return Promise.resolve({
        success: true,
        statusCode: 200,
        message: 'Fraud patterns retrieved',
        data: [],
        timestamp: new Date().toISOString()
      });
    }
  },
  getRiskAssessment: (tenderId) => {
    if (useRealAPI()) {
      return apiClient.get(`/fraud/risk-assessment/${tenderId}`);
    } else {
      // Mock API doesn't have this endpoint, return mock data
      return Promise.resolve({
        success: true,
        statusCode: 200,
        message: 'Risk assessment retrieved',
        data: {
          riskLevel: 'medium',
          score: 65,
          factors: [
            { factor: 'Bid history', weight: 30, impact: 'medium' },
            { factor: 'Financial capacity', weight: 25, impact: 'low' },
            { factor: 'Compliance record', weight: 45, impact: 'high' }
          ],
          recommendations: ['Monitor closely', 'Verify documentation']
        },
        timestamp: new Date().toISOString()
      });
    }
  },
};

// Audit API endpoints
export const auditAPI = {
  getAudits: async (params) => {
    if (useRealAPI()) {
      return apiClient.get('/audit/audits', { params });
    } else {
      return mockAPI.audit.getAudits(params);
    }
  },
  getAuditDetails: (auditId) => {
    if (useRealAPI()) {
      return apiClient.get(`/audit/audits/${auditId}`);
    } else {
      // Mock API doesn't have this endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Get audit details endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  createAudit: (auditData) => {
    if (useRealAPI()) {
      return apiClient.post('/audit/audits', auditData);
    } else {
      // Mock API doesn't have this endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Create audit endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  updateAudit: (auditId, auditData) => {
    if (useRealAPI()) {
      return apiClient.put(`/audit/audits/${auditId}`, auditData);
    } else {
      // Mock API doesn't have this endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Update audit endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  getAuditTrail: (entityType, entityId) => {
    if (useRealAPI()) {
      return apiClient.get(`/audit/trail/${entityType}/${entityId}`);
    } else {
      // Mock API doesn't have this endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Get audit trail endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  exportAuditReport: (params) => {
    if (useRealAPI()) {
      return apiClient.get('/audit/export', { params });
    } else {
      // Mock API doesn't have this endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Export audit report endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
};

// Reports API endpoints
export const reportsAPI = {
  getReports: async (params) => {
    if (useRealAPI()) {
      return apiClient.get('/reports', { params });
    } else {
      return mockAPI.reports.getReports(params);
    }
  },
  getReportDetails: (reportId) => {
    if (useRealAPI()) {
      return apiClient.get(`/reports/${reportId}`);
    } else {
      // Mock API doesn't have this endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Get report details endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  generateReport: (reportData) => {
    if (useRealAPI()) {
      return apiClient.post('/reports/generate', reportData);
    } else {
      // Mock API doesn't have this endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Generate report endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  exportReport: (reportId, format) => {
    if (useRealAPI()) {
      return apiClient.get(`/reports/${reportId}/export`, {
        params: { format },
        responseType: 'blob'
      });
    } else {
      // Mock API doesn't have this endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Export report endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
  getReportTemplates: () => {
    if (useRealAPI()) {
      return apiClient.get('/reports/templates');
    } else {
      // Mock API doesn't have this endpoint, return error
      return Promise.resolve({
        success: false,
        statusCode: 404,
        message: 'Get report templates endpoint not implemented in mock API',
        timestamp: new Date().toISOString()
      });
    }
  },
};

// Utility API endpoints
export const utilsAPI = {
  uploadFile: (file, folder) => {
    if (useRealAPI()) {
      const formData = new FormData();
      formData.append('file', file);
      if (folder) formData.append('folder', folder);
      return apiClient.post('/utils/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Mock API doesn't have file upload, return mock response
      return Promise.resolve({
        success: true,
        statusCode: 200,
        message: 'File uploaded successfully',
        data: {
          url: URL.createObjectURL(file),
          filename: file.name,
          size: file.size,
          type: file.type
        },
        timestamp: new Date().toISOString()
      });
    }
  },
  search: async (query, filters) => {
    if (useRealAPI()) {
      return apiClient.get('/utils/search', { params: { q: query, ...filters } });
    } else {
      return mockAPI.utils.search(query, filters);
    }
  },
  getWardList: async () => {
    if (useRealAPI()) {
      return apiClient.get('/utils/wards');
    } else {
      return mockAPI.utils.getWardList();
    }
  },
  getCountyList: async () => {
    if (useRealAPI()) {
      return apiClient.get('/utils/counties');
    } else {
      return mockAPI.utils.getCountyList();
    }
  },
};

export default apiClient;