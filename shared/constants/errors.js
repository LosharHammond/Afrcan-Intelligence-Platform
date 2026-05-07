/**
 * Application constants
 */

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_TOKEN: 'Invalid or expired token',
  UNAUTHORIZED: 'Unauthorized access',
  INVALID_DATA: 'Invalid request data',
  COUNTRY_NOT_FOUND: 'Country not found',
  DATA_NOT_AVAILABLE: 'Data not available',
  EXTERNAL_API_ERROR: 'Failed to fetch from external API',
  DATABASE_ERROR: 'Database operation failed',
  INTERNAL_ERROR: 'Internal server error'
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  DATA_RETRIEVED: 'Data retrieved successfully',
  OPERATION_SUCCESS: 'Operation completed successfully'
};

export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 900, // 15 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400 // 24 hours
};

export const RATE_LIMITS = {
  PUBLIC: 100, // requests per 15 minutes
  AUTHENTICATED: 1000,
  ADMIN: 10000
};