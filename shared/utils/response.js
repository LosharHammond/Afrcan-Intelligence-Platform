/**
 * Centralized API response formatter
 * Ensures consistent response structure across all endpoints
 */

import { HTTP_STATUS, ERROR_MESSAGES } from '../constants/errors.js';

export class ApiResponse {
  static success(data, message = 'Success', statusCode = HTTP_STATUS.OK) {
    return {
      success: true,
      statusCode,
      data,
      message,
      timestamp: new Date().toISOString()
    };
  }

  static error(message = ERROR_MESSAGES.INTERNAL_ERROR, statusCode = HTTP_STATUS.INTERNAL_ERROR, errors = null) {
    return {
      success: false,
      statusCode,
      message,
      errors,
      timestamp: new Date().toISOString()
    };
  }

  static paginated(data, page = 1, limit = 10, total = 0) {
    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      timestamp: new Date().toISOString()
    };
  }
}

export function sendResponse(res, response) {
  return res.status(response.statusCode).json(response);
}