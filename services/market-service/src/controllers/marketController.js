/**
 * Market Service Controller
 * Handles market data endpoints
 */

import { ApiResponse, sendResponse } from '../../../shared/utils/response.js';
import Logger from '../../../shared/utils/logger.js';
import { getForex, getFuelPrices } from './marketService.js';
import { getHistoricalData, saveMarketData } from '../../../shared/utils/storage.js';
import { HTTP_STATUS, ERROR_MESSAGES } from '../../../shared/constants/errors.js';

const logger = new Logger('MarketService');

export async function getCurrentMarketData(req, res) {
  try {
    const country = req.params.country.toUpperCase();
    const currencyMap = { GH: 'GHS', NG: 'NGN', KE: 'KES', ZA: 'ZAR' };
    const currency = currencyMap[country];

    if (!currency) {
      return sendResponse(res, ApiResponse.error(
        ERROR_MESSAGES.COUNTRY_NOT_FOUND,
        HTTP_STATUS.BAD_REQUEST
      ));
    }

    const [forexData, fuelData] = await Promise.all([
      getForex(currency),
      getFuelPrices(country)
    ]);

    const data = {
      country,
      forex: forexData ? forexData.usdToLocal : 15.2,
      fuel: fuelData,
      inflation: 23.1,
      timestamp: new Date()
    };

    await saveMarketData(country, data);

    sendResponse(res, ApiResponse.success(data, 'Market data retrieved successfully'));
  } catch (error) {
    logger.error('Error fetching market data', error);
    sendResponse(res, ApiResponse.error(
      ERROR_MESSAGES.DATA_NOT_AVAILABLE,
      HTTP_STATUS.INTERNAL_ERROR
    ));
  }
}

export async function getHistoricalMarketData(req, res) {
  try {
    const country = req.params.country.toUpperCase();
    const limit = parseInt(req.query.limit) || 30;

    const data = await getHistoricalData(country, limit);

    if (!data || data.length === 0) {
      return sendResponse(res, ApiResponse.error(
        ERROR_MESSAGES.DATA_NOT_AVAILABLE,
        HTTP_STATUS.NOT_FOUND
      ));
    }

    sendResponse(res, ApiResponse.success(
      { country, historical: data },
      'Historical data retrieved successfully'
    ));
  } catch (error) {
    logger.error('Error fetching historical data', error);
    sendResponse(res, ApiResponse.error(
      ERROR_MESSAGES.DATABASE_ERROR,
      HTTP_STATUS.INTERNAL_ERROR
    ));
  }
}