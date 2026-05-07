# Nexara API Documentation

## Authentication

All API endpoints (except /auth) require JWT tokens.

### Login
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "admin"
  }
}
```

### Register
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "role": "user"
}
```

## Market Data Endpoints

### Get Current Market Data
```
GET /api/v1/market/:country
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "country": "GH",
    "forex": 15.2,
    "fuel": {
      "petrol": 15.8,
      "diesel": 14.2
    },
    "inflation": 23.1,
    "timestamp": "2026-05-07T10:00:00Z"
  },
  "message": "Market data retrieved successfully"
}
```

### Get Historical Data
```
GET /api/v1/market/historical/:country?limit=30
Authorization: Bearer {token}

Parameters:
  - limit: Number of records (default: 30, max: 365)

Response:
{
  "success": true,
  "data": {
    "country": "GH",
    "historical": [...]
  }
}
```

## Intelligence Endpoints

### Get AI Insights
```
GET /api/v1/intelligence/:country
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "country": "GH",
    "insight": "Ghana shows inflation...",
    "riskLevel": "high",
    "anomalies": ["Forex volatility detected"],
    "timestamp": "2026-05-07T10:00:00Z"
  }
}
```

### Get Country Briefing
```
GET /api/v1/intelligence/briefing/:country
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "country": "GH",
    "briefing": "# Economic Intelligence Briefing...",
    "generatedAt": "2026-05-07T10:00:00Z"
  }
}
```

## News Endpoints

### Get Country News
```
GET /api/v1/news/:country
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "country": "GH",
    "news": [
      {
        "title": "Ghana inflation rises",
        "summary": "Economic pressures...",
        "date": "2026-05-07T..."
      }
    ]
  }
}
```

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description",
  "errors": null,
  "timestamp": "2026-05-07T10:00:00Z"
}
```

### Status Codes
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error
- 503: Service Unavailable