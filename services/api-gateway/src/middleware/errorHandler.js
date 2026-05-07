/**
 * Error handling middleware
 * Catches and formats all errors consistently
 */

import { ApiResponse, sendResponse } from '../../../shared/utils/response.js';
import { HTTP_STATUS, ERROR_MESSAGES } from '../../../shared/constants/errors.js';
import Logger from '../../../shared/utils/logger.js';

const logger = new Logger('APIGateway-ErrorHandler');

export function errorHandler(err, req, res, next) {
  logger.error('Unhandled error', err);

  if (err.statusCode && err.message) {
    return sendResponse(res, ApiResponse.error(err.message, err.statusCode));
  }

  if (err.isValidationError) {
    return sendResponse(res, ApiResponse.error(
      ERROR_MESSAGES.INVALID_DATA,
      HTTP_STATUS.BAD_REQUEST,
      err.details
    ));
  }

  // Default error response
  sendResponse(res, ApiResponse.error(
    ERROR_MESSAGES.INTERNAL_ERROR,
    HTTP_STATUS.INTERNAL_ERROR
  ));
}

export function notFoundHandler(req, res) {
  sendResponse(res, ApiResponse.error(
    `Route ${req.path} not found`,
    HTTP_STATUS.NOT_FOUND
  ));
}