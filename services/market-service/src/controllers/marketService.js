/**
 * Market Service - Business logic
 * Handles data fetching and processing
 */

import axios from 'axios';
import Logger from '../../../shared/utils/logger.js';

const logger = new Logger('MarketService');

/**
 * Fetch live forex rates from ExchangeRate-API
 */
export async function getForex(countryCurrency) {
  try {
    const res = await axios.get('https://open.er-api.com/v6/latest/USD', {
      timeout: 5000
    });
    return {
      usdToLocal: res.data.rates[countryCurrency],
      timestamp: new Date()
    };
  } catch (error) {
    logger.warn('Error fetching forex from external API', { error: error.message });
    return null;
  }
}

/**
 * Get fuel prices for country (mock for now)
 */
export function getFuelPrices(country) {
  const mockPrices = {
    GH: { petrol: 15.8, diesel: 14.2 },
    NG: { petrol: 12.5, diesel: 11.8 },
    KE: { petrol: 16.2, diesel: 15.1 },
    ZA: { petrol: 18.5, diesel: 17.3 }
  };
  return Promise.resolve(mockPrices[country] || { petrol: 15.0, diesel: 14.0 });
}