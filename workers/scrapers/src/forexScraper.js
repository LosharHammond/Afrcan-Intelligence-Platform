/**
 * Forex Data Scraper
 * Fetches real-time forex rates from public APIs
 */

import axios from 'axios';
import Logger from '../../shared/utils/logger.js';

const logger = new Logger('ForexScraper');

const CURRENCY_PAIRS = ['GHS', 'NGN', 'KES', 'ZAR'];
const API_BASE = 'https://open.er-api.com/v6/latest/USD';

export async function scrapeForex() {
  try {
    logger.info('Starting forex scrape...');
    
    const response = await axios.get(API_BASE, { timeout: 10000 });
    const rates = response.data.rates;

    const forexData = {};
    for (const currency of CURRENCY_PAIRS) {
      forexData[currency] = rates[currency];
    }

    logger.info('Forex scrape completed', { currencies: Object.keys(forexData) });
    return forexData;
  } catch (error) {
    logger.error('Forex scrape failed', error);
    return null;
  }
}

export async function scrapeAndStoreForex() {
  const data = await scrapeForex();
  if (data) {
    // Send to market service
    try {
      await axios.post('http://localhost:4002/store-forex', { rates: data });
      logger.info('Forex data stored');
    } catch (error) {
      logger.error('Failed to store forex data', error);
    }
  }
}