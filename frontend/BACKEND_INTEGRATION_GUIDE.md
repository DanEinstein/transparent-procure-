# TransparentProcure Kenya - Backend Integration Guide

This document summarizes the frontend improvements made to facilitate seamless backend integration for the TransparentProcure Kenya platform.

## Overview

The frontend has been enhanced with a robust API service layer, authentication management, and data fetching utilities to make it easy for the backend team to implement the required endpoints.

## Key Improvements

### 1. API Service Layer (`src/api/apiService.js`)

- **Centralized API Management**: All API endpoints are organized in one place
- **Backend/Mock Fallback**: Automatically detects if backend is available and falls back to mock data
- **Consistent Error Handling**: Unified error handling with proper status codes
- **Authentication Interceptors**: Automatic token inclusion in requests and logout on 401 errors
- **Configurable Base URL**: Uses environment variable for API base URL

### 2. Authentication System (`src/context/AuthContext.js`)

- **React Context Management**: Centralized authentication state
- **Persistent Sessions**: Tokens stored in localStorage
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Expiry Handling**: Automatic logout on 401 responses

### 3. Data Fetching Utilities (`src/hooks/useApi.js`)

- **Generic Hook**: Reusable hook for API calls with loading/error states
- **Automatic Cleanup**: Prevents memory leaks with mounted checks
- **Refetch Capability**: Built-in refetch functionality

### 4. Mock Data System (`src/data/mockData.js`)

- **Complete Data Structures**: Realistic mock data for all entities
- **Reference for Backend**: Exact data shapes expected by frontend
- **Development Continuity**: Allows frontend development without backend

### 5. Mock API Service (`src/api/mockService.js`)

- **Full Endpoint Coverage**: Mock implementations for all API endpoints
- **Realistic Delays**: Simulates network latency
- **Error Scenarios**: Handles various error cases

### 6. Updated Pages

- **Dashboard Page**: Now fetches live data from API
- **Feed Page**: Dynamic content with filtering capabilities
- **All Pages**: Loading states and error handling implemented

## API Contract Details

See [API_CONTRACTS.md](./API_CONTRACTS.md) for detailed endpoint specifications and expected response formats.

## Environment Configuration

The frontend can be configured using environment variables:

```env
# .env file
VITE_API_BASE_URL=http://localhost:3001/api  # Backend API URL
VITE_USE_MOCK_API=true                       # Force use of mock API (optional)
```

## Response Format Standards

All API responses should follow this format:

```json
{
  "success": true/false,
  "statusCode": 200,
  "message": "Human-readable message",
  "data": {}, // Actual data payload (only for successful requests)
  "errors": [], // Error details (only for failed requests)
  "timestamp": "ISO date string"
}
```

## Authentication Flow

1. User submits credentials to `/auth/login`
2. Backend returns JWT token and user data
3. Token is stored in localStorage
4. Token is included in Authorization header for all subsequent requests
5. On 401 responses, user is automatically logged out

## Error Handling

- **401 Unauthorized**: Automatic logout and redirect to login
- **Network Errors**: Graceful degradation with user-friendly messages
- **Validation Errors**: Formatted error messages displayed to users

## Data Models Reference

See `src/data/mockData.js` for complete examples of expected data structures:

- User profiles
- Dashboard statistics
- Contractor information
- Feed posts
- Fraud alerts
- Audit records
- Reports
- Geographic data (wards, counties)

## Integration Steps for Backend Team

1. **Implement API Endpoints**: Follow the specifications in `API_CONTRACTS.md`
2. **Configure CORS**: Allow requests from frontend origin
3. **Set Up Authentication**: Implement JWT-based auth system
4. **Test Endpoints**: Verify all endpoints work with the frontend
5. **Deploy Backend**: Make API available at configured URL
6. **Remove Mock Toggle**: Once backend is ready, remove mock API usage

## Testing the Integration

1. Start your backend server
2. Ensure `VITE_API_BASE_URL` points to your backend
3. Start the frontend: `npm run dev`
4. The frontend will automatically detect the backend and switch from mock to real API
5. Monitor browser console for any API errors

## Troubleshooting

### Backend Not Detected
- Check that backend is running and accessible at configured URL
- Verify CORS headers are properly set
- Check browser console for network errors

### Authentication Issues
- Ensure JWT tokens are properly formatted
- Verify token expiration handling
- Check that user data structure matches frontend expectations

### Data Format Issues
- Compare your API responses with the expected format in `API_CONTRACTS.md`
- Ensure all required fields are present in responses
- Verify data types match frontend expectations

## Ready for Backend Development

The frontend is now fully prepared for backend integration. The backend team can implement the specified API endpoints knowing that:

- The frontend will gracefully handle both successful and error responses
- Authentication flow is established
- Loading and error states are implemented
- Mock data provides clear examples of expected data structures
- API service layer handles all the networking complexity