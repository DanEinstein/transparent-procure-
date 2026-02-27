# TransparentProcure Kenya - Frontend

This is the frontend application for the TransparentProcure Kenya platform, designed to provide transparency and oversight in public procurement processes in Kenya.

## Project Structure

```
src/
├── api/                    # API service layer
│   └── apiService.js       # Centralized API calls
├── components/             # Reusable UI components
│   ├── Layout.jsx          # Main layout component
│   ├── Sidebar.jsx         # Navigation sidebar
│   ├── Topbar.jsx          # Top navigation bar
│   └── ProtectedRoute.jsx  # Authentication guard
├── context/                # React Context providers
│   └── AuthContext.js      # Authentication state management
├── data/                   # Mock data for reference
│   └── mockData.js         # Sample data structures
├── hooks/                  # Custom React hooks
│   └── useApi.js           # Generic API hook
├── pages/                  # Page components
│   ├── Audit.jsx           # Audit module page
│   ├── Dashboard.jsx       # Main dashboard page
│   ├── Feed.jsx            # Community feed page
│   ├── Fraud.jsx           # Fraud monitoring page
│   ├── Login.jsx           # Login page
│   ├── Registry.jsx        # Contractor registry page
│   └── Reports.jsx         # Reports page
├── utils/                  # Utility functions
│   └── responseHandler.js  # Response formatting utilities
├── App.jsx                 # Main routing component
├── main.jsx                # Entry point
├── App.css                 # Global styles
└── index.css               # Base styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

3. Start the development server:
```bash
npm run dev
```

## Frontend-Backend Integration

### API Service Layer

The frontend uses a centralized API service located at `src/api/apiService.js`. This service handles:

- Base URL configuration
- Request/response interceptors
- Authentication token management
- Error handling
- All API endpoints organized by domain

### Authentication Flow

1. User submits credentials on the login page
2. Credentials are sent to `/api/auth/login`
3. Backend responds with user data and JWT token
4. Token is stored in localStorage
5. Token is included in the Authorization header for all subsequent requests
6. When token expires or user logs out, token is removed from localStorage

### State Management

- Authentication state is managed using React Context (`src/context/AuthContext.js`)
- API calls use custom hooks like `useApi` for loading/error states
- Protected routes are handled by `ProtectedRoute` component

### Expected Backend Implementation

The backend team should implement the API endpoints as described in the [API_CONTRACTS.md](./API_CONTRACTS.md) file. The frontend expects:

- RESTful API endpoints following the specified contract
- Consistent response format with success/error indicators
- Proper authentication using JWT tokens
- Standard HTTP status codes
- Error messages in the expected format

## Data Structures

The `src/data/mockData.js` file contains sample data structures that serve as a reference for the backend team. These represent the expected shape of data returned by the API endpoints.

## Error Handling

The frontend includes comprehensive error handling:

- Network errors are caught by the API service
- Unauthorized responses trigger automatic logout
- Form validation errors are displayed to users
- Loading states are shown during API calls

## Security Considerations

- All API requests include authorization tokens
- Input sanitization utilities are available
- Passwords are not stored locally
- Secure token storage in localStorage with HTTP-only cookies recommended for production

## Environment Variables

- `VITE_API_BASE_URL`: The base URL for the backend API (defaults to `http://localhost:3001/api`)

## Development Guidelines

1. All new API endpoints should be added to the `apiService.js` file
2. Follow the existing response format for consistency
3. Use the `useApi` hook for data fetching in components
4. Wrap protected routes with the `ProtectedRoute` component
5. Use the authentication context for accessing user data

## Integration Checklist for Backend Team

- [ ] Implement all endpoints specified in API_CONTRACTS.md
- [ ] Ensure consistent response format
- [ ] Set up authentication with JWT tokens
- [ ] Configure CORS to allow frontend origin
- [ ] Implement proper error handling
- [ ] Test all endpoints with the frontend
- [ ] Document any deviations from the contract

## Running with Backend

To run the frontend with the backend:

1. Start your backend server on the configured port (default: 3001)
2. Update `VITE_API_BASE_URL` in `.env` if needed
3. Start the frontend with `npm run dev`
4. Access the application at `http://localhost:5173`

## Troubleshooting

If the frontend cannot connect to the backend:
1. Verify the backend server is running
2. Check that the `VITE_API_BASE_URL` is correctly configured
3. Confirm that CORS is properly configured on the backend
4. Check browser console for network errors

For authentication issues:
1. Verify JWT token format and expiration
2. Check that Authorization header is correctly formatted
3. Confirm token decoding on backend matches encoding

## Additional Resources

- [API Contracts Documentation](./API_CONTRACTS.md) - Detailed API endpoint specifications
- [Mock Data Reference](./src/data/mockData.js) - Expected data structures
- [Response Handler Utilities](./src/utils/responseHandler.js) - Standard response formats