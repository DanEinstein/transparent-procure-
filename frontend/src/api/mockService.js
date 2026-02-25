// Mock API service to simulate backend responses until backend is implemented
// This allows frontend development to continue without a backend

import { 
  mockUser,
  mockDashboardStats,
  mockContractorScores,
  mockPriceAnomalies,
  mockWardFeed,
  mockFeedPosts,
  mockContractors,
  mockFraudAlerts,
  mockAudits,
  mockReports,
  mockWards,
  mockCounties
} from '../data/mockData';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock authentication API
export const mockAuthAPI = {
  login: async (credentials) => {
    await delay(800); // Simulate network delay
    
    // Simple validation - in real backend, this would check against database
    if (credentials.userId && credentials.password) {
      return {
        success: true,
        statusCode: 200,
        message: 'Login successful',
        data: {
          user: mockUser,
          token: 'mock_jwt_token_for_development_purpose_only'
        },
        timestamp: new Date().toISOString()
      };
    } else {
      return {
        success: false,
        statusCode: 401,
        message: 'Invalid credentials',
        timestamp: new Date().toISOString()
      };
    }
  },

  logout: async () => {
    await delay(300);
    return {
      success: true,
      statusCode: 200,
      message: 'Logout successful',
      timestamp: new Date().toISOString()
    };
  },

  getCurrentUser: async () => {
    await delay(300);
    return {
      success: true,
      statusCode: 200,
      message: 'User data retrieved',
      data: { user: mockUser },
      timestamp: new Date().toISOString()
    };
  }
};

// Mock dashboard API
export const mockDashboardAPI = {
  getStats: async () => {
    await delay(500);
    return {
      success: true,
      statusCode: 200,
      message: 'Dashboard stats retrieved',
      data: mockDashboardStats,
      timestamp: new Date().toISOString()
    };
  },

  getContractorScores: async () => {
    await delay(600);
    return {
      success: true,
      statusCode: 200,
      message: 'Contractor scores retrieved',
      data: mockContractorScores,
      timestamp: new Date().toISOString()
    };
  },

  getAnomalies: async () => {
    await delay(500);
    return {
      success: true,
      statusCode: 200,
      message: 'Anomalies retrieved',
      data: mockPriceAnomalies,
      timestamp: new Date().toISOString()
    };
  },

  getRecentActivities: async () => {
    await delay(500);
    return {
      success: true,
      statusCode: 200,
      message: 'Recent activities retrieved',
      data: [], // Add mock data if needed
      timestamp: new Date().toISOString()
    };
  },

  getWardFeed: async () => {
    await delay(700);
    return {
      success: true,
      statusCode: 200,
      message: 'Ward feed retrieved',
      data: mockWardFeed,
      timestamp: new Date().toISOString()
    };
  }
};

// Mock feed API
export const mockFeedAPI = {
  getWardFeed: async (wardId) => {
    await delay(600);
    return {
      success: true,
      statusCode: 200,
      message: 'Ward feed retrieved',
      data: mockFeedPosts.filter(post => post.ward.includes(wardId)),
      timestamp: new Date().toISOString()
    };
  },

  getPosts: async (params) => {
    await delay(700);
    let filteredPosts = [...mockFeedPosts];
    
    if (params.wardId) {
      filteredPosts = filteredPosts.filter(post => post.ward === params.wardId);
    }
    
    // Simple pagination
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    return {
      success: true,
      statusCode: 200,
      message: 'Feed posts retrieved',
      data: {
        posts: paginatedPosts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredPosts.length / limit),
          totalItems: filteredPosts.length,
          hasNextPage: endIndex < filteredPosts.length,
          hasPrevPage: startIndex > 0,
          nextPage: endIndex < filteredPosts.length ? page + 1 : null,
          prevPage: startIndex > 0 ? page - 1 : null
        }
      },
      timestamp: new Date().toISOString()
    };
  },

  createPost: async (postData) => {
    await delay(800);
    return {
      success: true,
      statusCode: 201,
      message: 'Post created successfully',
      data: {
        id: `post_${Date.now()}`,
        ...postData,
        author: mockUser,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0
      },
      timestamp: new Date().toISOString()
    };
  }
};

// Mock registry API
export const mockRegistryAPI = {
  getContractors: async (params) => {
    await delay(700);
    let filteredContractors = [...mockContractors];
    
    if (params.search) {
      filteredContractors = filteredContractors.filter(contractor =>
        contractor.name.toLowerCase().includes(params.search.toLowerCase()) ||
        contractor.kraPin.toLowerCase().includes(params.search.toLowerCase())
      );
    }
    
    if (params.category) {
      filteredContractors = filteredContractors.filter(contractor =>
        contractor.category.toLowerCase() === params.category.toLowerCase()
      );
    }
    
    if (params.region) {
      filteredContractors = filteredContractors.filter(contractor =>
        contractor.region.toLowerCase() === params.region.toLowerCase()
      );
    }
    
    if (params.status) {
      filteredContractors = filteredContractors.filter(contractor =>
        contractor.status.toLowerCase() === params.status.toLowerCase()
      );
    }
    
    // Simple pagination
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedContractors = filteredContractors.slice(startIndex, endIndex);
    
    return {
      success: true,
      statusCode: 200,
      message: 'Contractors retrieved',
      data: {
        contractors: paginatedContractors,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredContractors.length / limit),
          totalItems: filteredContractors.length,
          hasNextPage: endIndex < filteredContractors.length,
          hasPrevPage: startIndex > 0,
          nextPage: endIndex < filteredContractors.length ? page + 1 : null,
          prevPage: startIndex > 0 ? page - 1 : null
        }
      },
      timestamp: new Date().toISOString()
    };
  },

  getContractorDetails: async (contractorId) => {
    await delay(500);
    const contractor = mockContractors.find(c => c.id === contractorId);
    
    if (contractor) {
      return {
        success: true,
        statusCode: 200,
        message: 'Contractor details retrieved',
        data: contractor,
        timestamp: new Date().toISOString()
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: 'Contractor not found',
        timestamp: new Date().toISOString()
      };
    }
  },

  createContractor: async (contractorData) => {
    await delay(800);
    const newContractor = {
      id: `contr_${Date.now()}`,
      ...contractorData,
      registrationDate: new Date().toISOString(),
      rating: 0,
      projectsCompleted: 0,
      activeProjects: 0,
      blacklisted: false,
      blacklistReason: null,
      complianceScore: 0,
      lastActivity: new Date().toISOString(),
      status: 'active'
    };
    
    return {
      success: true,
      statusCode: 201,
      message: 'Contractor created successfully',
      data: newContractor,
      timestamp: new Date().toISOString()
    };
  }
};

// Mock fraud API
export const mockFraudAPI = {
  getAlerts: async (params) => {
    await delay(600);
    let filteredAlerts = [...mockFraudAlerts];
    
    if (params.severity) {
      filteredAlerts = filteredAlerts.filter(alert =>
        alert.severity.toLowerCase() === params.severity.toLowerCase()
      );
    }
    
    if (params.status) {
      filteredAlerts = filteredAlerts.filter(alert =>
        alert.status.toLowerCase() === params.status.toLowerCase()
      );
    }
    
    // Simple pagination
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedAlerts = filteredAlerts.slice(startIndex, endIndex);
    
    return {
      success: true,
      statusCode: 200,
      message: 'Fraud alerts retrieved',
      data: {
        alerts: paginatedAlerts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredAlerts.length / limit),
          totalItems: filteredAlerts.length,
          hasNextPage: endIndex < filteredAlerts.length,
          hasPrevPage: startIndex > 0,
          nextPage: endIndex < filteredAlerts.length ? page + 1 : null,
          prevPage: startIndex > 0 ? page - 1 : null
        }
      },
      timestamp: new Date().toISOString()
    };
  },

  getAlertDetails: async (alertId) => {
    await delay(500);
    const alert = mockFraudAlerts.find(a => a.id === alertId);
    
    if (alert) {
      return {
        success: true,
        statusCode: 200,
        message: 'Alert details retrieved',
        data: alert,
        timestamp: new Date().toISOString()
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: 'Alert not found',
        timestamp: new Date().toISOString()
      };
    }
  }
};

// Mock audit API
export const mockAuditAPI = {
  getAudits: async (params) => {
    await delay(600);
    let filteredAudits = [...mockAudits];
    
    if (params.type) {
      filteredAudits = filteredAudits.filter(audit =>
        audit.type.toLowerCase() === params.type.toLowerCase()
      );
    }
    
    if (params.status) {
      filteredAudits = filteredAudits.filter(audit =>
        audit.status.toLowerCase() === params.status.toLowerCase()
      );
    }
    
    // Simple pagination
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedAudits = filteredAudits.slice(startIndex, endIndex);
    
    return {
      success: true,
      statusCode: 200,
      message: 'Audits retrieved',
      data: {
        audits: paginatedAudits,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredAudits.length / limit),
          totalItems: filteredAudits.length,
          hasNextPage: endIndex < filteredAudits.length,
          hasPrevPage: startIndex > 0,
          nextPage: endIndex < filteredAudits.length ? page + 1 : null,
          prevPage: startIndex > 0 ? page - 1 : null
        }
      },
      timestamp: new Date().toISOString()
    };
  }
};

// Mock reports API
export const mockReportsAPI = {
  getReports: async (params) => {
    await delay(600);
    let filteredReports = [...mockReports];
    
    if (params.type) {
      filteredReports = filteredReports.filter(report =>
        report.type.toLowerCase() === params.type.toLowerCase()
      );
    }
    
    if (params.category) {
      filteredReports = filteredReports.filter(report =>
        report.category.toLowerCase() === params.category.toLowerCase()
      );
    }
    
    // Simple pagination
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedReports = filteredReports.slice(startIndex, endIndex);
    
    return {
      success: true,
      statusCode: 200,
      message: 'Reports retrieved',
      data: {
        reports: paginatedReports,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredReports.length / limit),
          totalItems: filteredReports.length,
          hasNextPage: endIndex < filteredReports.length,
          hasPrevPage: startIndex > 0,
          nextPage: endIndex < filteredReports.length ? page + 1 : null,
          prevPage: startIndex > 0 ? page - 1 : null
        }
      },
      timestamp: new Date().toISOString()
    };
  }
};

// Mock utility API
export const mockUtilsAPI = {
  search: async (query, filters) => {
    await delay(500);
    
    // Simple search across all mock data
    const allResults = [
      ...mockContractors.map(item => ({ ...item, type: 'contractor' })),
      ...mockFeedPosts.map(item => ({ ...item, type: 'post' })),
      ...mockAudits.map(item => ({ ...item, type: 'audit' })),
      ...mockReports.map(item => ({ ...item, type: 'report' }))
    ];
    
    const filteredResults = allResults.filter(item =>
      JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      success: true,
      statusCode: 200,
      message: 'Search results retrieved',
      data: {
        results: filteredResults.slice(0, 10) // Limit to 10 results
      },
      timestamp: new Date().toISOString()
    };
  },

  getWardList: async () => {
    await delay(400);
    return {
      success: true,
      statusCode: 200,
      message: 'Wards retrieved',
      data: mockWards,
      timestamp: new Date().toISOString()
    };
  },

  getCountyList: async () => {
    await delay(400);
    return {
      success: true,
      statusCode: 200,
      message: 'Counties retrieved',
      data: mockCounties,
      timestamp: new Date().toISOString()
    };
  }
};

// Export all mock APIs
export default {
  auth: mockAuthAPI,
  dashboard: mockDashboardAPI,
  feed: mockFeedAPI,
  registry: mockRegistryAPI,
  fraud: mockFraudAPI,
  audit: mockAuditAPI,
  reports: mockReportsAPI,
  utils: mockUtilsAPI
};