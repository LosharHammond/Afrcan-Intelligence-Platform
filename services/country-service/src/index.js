/**
 * Country Service
 * Manages country-specific data and configuration
 */

import express from 'express';
import cors from 'cors';
import { COUNTRIES } from '../../shared/constants/countries.ts';
import { ApiResponse, sendResponse } from '../../shared/utils/response.js';
import Logger from '../../shared/utils/logger.js';

const app = express();
const PORT = 4001;
const logger = new Logger('CountryService');

app.use(cors());
app.use(express.json());

/**
 * GET /countries
 * Returns list of supported countries
 */
app.get('/', (req, res) => {
  try {
    const countries = Object.values(COUNTRIES).map(c => ({
      code: c.code,
      name: c.name,
      currency: c.currency,
      capital: c.capital
    }));

    sendResponse(res, ApiResponse.success(
      { countries },
      'Countries retrieved successfully'
    ));
  } catch (error) {
    logger.error('Failed to retrieve countries', error);
    sendResponse(res, ApiResponse.error(
      'Failed to retrieve countries',
      500
    ));
  }
});

/**
 * GET /countries/:code
 * Returns specific country details
 */
app.get('/:code', (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const country = COUNTRIES[code];

    if (!country) {
      return sendResponse(res, ApiResponse.error(
        'Country not found',
        404
      ));
    }

    sendResponse(res, ApiResponse.success(
      country,
      'Country details retrieved successfully'
    ));
  } catch (error) {
    logger.error('Failed to retrieve country', error);
    sendResponse(res, ApiResponse.error(
      'Failed to retrieve country',
      500
    ));
  }
});

/**
 * GET /health
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'Country Service online', timestamp: new Date() });
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
  logger.error('Unhandled error', err);
  sendResponse(res, ApiResponse.error(
    'Internal server error',
    500
  ));
});

app.listen(PORT, () => {
  logger.info(`Country Service running on port ${PORT}`);
});