# TransparentProcure Kenya - API Contracts

This document outlines the expected API contracts between the frontend and backend for the TransparentProcure Kenya platform. Backend developers should implement these endpoints to ensure seamless integration with the frontend application.

## Base URL Configuration

The frontend expects the backend API to be available at:
- Development: `http://localhost:3001/api`
- Production: Configurable via environment variable `VITE_API_BASE_URL`

## Authentication Endpoints

### POST `/api/auth/login`
**Request:**
```json
{
  "userId": "string",
  "password": "string"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "string",
      "userId": "string",
      "email": "string",
      "name": "string",
      "role": "string",
      "permissions": ["string"],
      "department": "string",
      "createdAt": "ISODateString",
      "lastLogin": "ISODateString"
    },
    "token": "JWT_token_string"
  },
  "timestamp": "ISODateString"
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "statusCode": 401,
  "message": "Invalid credentials",
  "timestamp": "ISODateString"
}
```

### POST `/api/auth/logout`
**Request:** None (uses Authorization header)
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Logout successful",
  "timestamp": "ISODateString"
}
```

### GET `/api/auth/me`
**Request:** None (uses Authorization header)
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User data retrieved",
  "data": {
    "user": {
      "id": "string",
      "userId": "string",
      "email": "string",
      "name": "string",
      "role": "string",
      "permissions": ["string"],
      "department": "string",
      "createdAt": "ISODateString",
      "lastLogin": "ISODateString"
    }
  },
  "timestamp": "ISODateString"
}
```

## Dashboard Endpoints

### GET `/api/dashboard/stats`
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Dashboard stats retrieved",
  "data": {
    "avgBidDeviation": 14.2,
    "avgBidDeviationChange": 2.1,
    "activeTenders": 1284,
    "activeTendersChange": -5.2,
    "flaggedAnomalies": 42,
    "flaggedAnomaliesChange": 12,
    "totalContractors": 2450,
    "contractorsBlacklisted": 12,
    "activeProjects": 892,
    "projectsCompleted": 756
  },
  "timestamp": "ISODateString"
}
```

### GET `/api/dashboard/contractor-scores`
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Contractor scores retrieved",
  "data": [
    {
      "id": "string",
      "name": "string",
      "licenseNumber": "string",
      "score": 88,
      "category": "string",
      "region": "string",
      "projectsCompleted": 45,
      "avgCompletionTime": "string",
      "complianceRating": 92,
      "lastProject": "string",
      "status": "string"
    }
  ],
  "timestamp": "ISODateString"
}
```

### GET `/api/dashboard/anomalies`
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Anomalies retrieved",
  "data": [
    {
      "id": "string",
      "tenderId": "string",
      "itemCategory": "string",
      "quotedPrice": 12500000,
      "marketAverage": 4200000,
      "variance": 197,
      "unit": "KES",
      "tenderDescription": "string",
      "contractor": "string",
      "submittedDate": "ISODateString",
      "status": "string"
    }
  ],
  "timestamp": "ISODateString"
}
```

### GET `/api/dashboard/ward-feed`
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Ward feed retrieved",
  "data": [
    {
      "id": "string",
      "ward": "string",
      "eventType": "string",
      "title": "string",
      "description": "string",
      "amount": 1200000,
      "timestamp": "ISODateString",
      "priority": "string",
      "color": "string"
    }
  ],
  "timestamp": "ISODateString"
}
```

## Feed Endpoints

### GET `/api/feed/posts`
**Query Parameters:**
- `wardId` (optional)
- `limit` (optional, default: 10)
- `page` (optional, default: 1)
- `category` (optional)

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Feed posts retrieved",
  "data": {
    "posts": [
      {
        "id": "string",
        "author": {
          "id": "string",
          "name": "string",
          "avatar": "URL",
          "verified": true
        },
        "ward": "string",
        "title": "string",
        "content": "string",
        "images": ["URL"],
        "status": "string",
        "likes": 24,
        "comments": 8,
        "timestamp": "ISODateString",
        "referenceId": "string",
        "geoTag": {
          "lat": -1.286484,
          "lng": 36.817259,
          "location": "string"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "hasNextPage": true,
      "hasPrevPage": false,
      "nextPage": 2,
      "prevPage": null
    }
  },
  "timestamp": "ISODateString"
}
```

### POST `/api/feed/posts`
**Request:**
```json
{
  "ward": "string",
  "title": "string",
  "content": "string",
  "images": ["URL"],
  "status": "string",
  "geoTag": {
    "lat": -1.286484,
    "lng": 36.817259,
    "location": "string"
  }
}
```

## Registry Endpoints

### GET `/api/registry/contractors`
**Query Parameters:**
- `search` (optional)
- `category` (optional)
- `region` (optional)
- `status` (optional)
- `limit` (optional, default: 10)
- `page` (optional, default: 1)

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Contractors retrieved",
  "data": {
    "contractors": [
      {
        "id": "string",
        "name": "string",
        "kraPin": "string",
        "licenseNumber": "string",
        "registrationDate": "ISODateString",
        "category": "string",
        "subcategories": ["string"],
        "region": "string",
        "contactPerson": "string",
        "contactEmail": "string",
        "contactPhone": "string",
        "address": "string",
        "rating": 4.2,
        "projectsCompleted": 45,
        "activeProjects": 3,
        "blacklisted": false,
        "blacklistReason": null,
        "complianceScore": 92,
        "financialCapacity": 500000000,
        "lastActivity": "ISODateString",
        "status": "string"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "hasNextPage": true,
      "hasPrevPage": false,
      "nextPage": 2,
      "prevPage": null
    }
  },
  "timestamp": "ISODateString"
}
```

### GET `/api/registry/contractors/{contractorId}`
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Contractor details retrieved",
  "data": {
    "id": "string",
    "name": "string",
    "kraPin": "string",
    "licenseNumber": "string",
    "registrationDate": "ISODateString",
    "category": "string",
    "subcategories": ["string"],
    "region": "string",
    "contactPerson": "string",
    "contactEmail": "string",
    "contactPhone": "string",
    "address": "string",
    "rating": 4.2,
    "projectsCompleted": 45,
    "activeProjects": 3,
    "blacklisted": false,
    "blacklistReason": null,
    "complianceScore": 92,
    "financialCapacity": 500000000,
    "lastActivity": "ISODateString",
    "status": "string"
  },
  "timestamp": "ISODateString"
}
```

### POST `/api/registry/contractors`
**Request:**
```json
{
  "name": "string",
  "kraPin": "string",
  "licenseNumber": "string",
  "category": "string",
  "subcategories": ["string"],
  "region": "string",
  "contactPerson": "string",
  "contactEmail": "string",
  "contactPhone": "string",
  "address": "string",
  "financialCapacity": 500000000
}
```

### POST `/api/registry/contractors/{contractorId}/blacklist`
**Request:**
```json
{
  "reason": "string"
}
```

### GET `/api/registry/blacklisted`
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Blacklisted contractors retrieved",
  "data": [
    {
      "id": "string",
      "name": "string",
      "kraPin": "string",
      "licenseNumber": "string",
      "blacklistReason": "string",
      "blacklistedAt": "ISODateString",
      "blacklistedBy": "string"
    }
  ],
  "timestamp": "ISODateString"
}
```

## Fraud Monitoring Endpoints

### GET `/api/fraud/alerts`
**Query Parameters:**
- `severity` (optional: high, medium, low)
- `status` (optional: open, investigating, resolved)
- `limit` (optional, default: 10)
- `page` (optional, default: 1)

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Fraud alerts retrieved",
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "severity": "string",
      "status": "string",
      "detectedBy": "string",
      "detectedAt": "ISODateString",
      "affectedTenders": ["string"],
      "affectedContractors": ["string"],
      "evidence": ["string"],
      "assignedTo": "string",
      "resolutionNotes": null,
      "resolvedAt": null
    }
  ],
  "timestamp": "ISODateString"
}
```

### POST `/api/fraud/alerts`
**Request:**
```json
{
  "title": "string",
  "description": "string",
  "severity": "string",
  "detectedBy": "string",
  "affectedTenders": ["string"],
  "affectedContractors": ["string"],
  "evidence": ["string"]
}
```

### PATCH `/api/fraud/alerts/{alertId}/resolve`
**Request:**
```json
{
  "resolutionNotes": "string"
}
```

### GET `/api/fraud/risk-assessment/{tenderId}`
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Risk assessment retrieved",
  "data": {
    "riskLevel": "string",
    "score": 85,
    "factors": [
      {
        "factor": "string",
        "weight": 30,
        "impact": "high"
      }
    ],
    "recommendations": ["string"]
  },
  "timestamp": "ISODateString"
}
```

## Audit Endpoints

### GET `/api/audit/audits`
**Query Parameters:**
- `type` (optional: routine, special, compliance)
- `status` (optional: pending, in_progress, completed)
- `limit` (optional, default: 10)
- `page` (optional, default: 1)

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Audits retrieved",
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "type": "string",
      "status": "string",
      "startDate": "ISODateString",
      "endDate": "ISODateString",
      "assignedTo": ["string"],
      "findings": ["string"],
      "recommendations": ["string"],
      "reportUrl": "URL",
      "createdAt": "ISODateString",
      "completedAt": "ISODateString"
    }
  ],
  "timestamp": "ISODateString"
}
```

### POST `/api/audit/audits`
**Request:**
```json
{
  "title": "string",
  "description": "string",
  "type": "string",
  "startDate": "ISODateString",
  "endDate": "ISODateString",
  "assignedTo": ["string"],
  "scope": ["string"]
}
```

## Reports Endpoints

### GET `/api/reports`
**Query Parameters:**
- `type` (optional)
- `category` (optional)
- `period` (optional)
- `limit` (optional, default: 10)
- `page` (optional, default: 1)

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Reports retrieved",
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "type": "string",
      "category": "string",
      "period": "string",
      "generatedAt": "ISODateString",
      "generatedBy": "string",
      "status": "string",
      "fileUrl": "URL",
      "size": "string",
      "pageCount": 45,
      "recipients": ["string"],
      "accessLevel": "string"
    }
  ],
  "timestamp": "ISODateString"
}
```

### POST `/api/reports/generate`
**Request:**
```json
{
  "title": "string",
  "type": "string",
  "category": "string",
  "period": "string",
  "filters": {},
  "recipients": ["string"]
}
```

### GET `/api/reports/{reportId}/export`
**Query Parameters:**
- `format` (pdf, excel, csv)

## Utility Endpoints

### POST `/api/utils/upload`
**Request:** Multipart form data with file
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "File uploaded successfully",
  "data": {
    "url": "URL",
    "filename": "string",
    "size": "string",
    "type": "string"
  },
  "timestamp": "ISODateString"
}
```

### GET `/api/utils/search`
**Query Parameters:**
- `q` (search query)
- `type` (optional: contractor, tender, project)

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Search results retrieved",
  "data": {
    "results": [
      {
        "id": "string",
        "type": "string",
        "title": "string",
        "description": "string",
        "url": "URL"
      }
    ]
  },
  "timestamp": "ISODateString"
}
```

### GET `/api/utils/wards`
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Wards retrieved",
  "data": [
    {
      "id": "string",
      "name": "string",
      "county": "string",
      "code": "string"
    }
  ],
  "timestamp": "ISODateString"
}
```

### GET `/api/utils/counties`
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Counties retrieved",
  "data": [
    {
      "id": "string",
      "name": "string",
      "code": "string"
    }
  ],
  "timestamp": "ISODateString"
}
```

## Error Response Format

All error responses follow this format:
```json
{
  "success": false,
  "statusCode": "HTTP Status Code",
  "message": "Error message",
  "errors": [
    {
      "field": "field_name",
      "message": "Field-specific error message"
    }
  ],
  "timestamp": "ISODateString"
}
```

## Response Headers

- Content-Type: `application/json`
- Authorization: `Bearer {token}` (for authenticated requests)