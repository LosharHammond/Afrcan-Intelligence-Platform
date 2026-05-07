/**
 * Data Scraper Controller
 * Orchestrates all scraping operations
 */

import { scrapeAndStoreForex } from './forexScraper.js';
import { scrapeAllCountriesNews } from './newsScraper.js';
import Logger from '../../shared/utils/logger.js';

const logger = new Logger('ScraperController');

export async function runAllScrapers() {
  try {
    logger.info('Starting all scraper operations...');

    // Run scrapers in parallel where possible
    const [forexResult, newsResult] = await Promise.allSettled([
      scrapeAndStoreForex(),
      scrapeAllCountriesNews()
    ]);

    if (forexResult.status === 'fulfilled') {
      logger.info('Forex scraper completed successfully');
    } else {
      logger.error('Forex scraper failed', forexResult.reason);
    }

    if (newsResult.status === 'fulfilled') {
      logger.info('News scraper completed successfully');
    } else {
      logger.error('News scraper failed', newsResult.reason);
    }

    return {
      forex: forexResult.status === 'fulfilled' ? forexResult.value : null,
      news: newsResult.status === 'fulfilled' ? newsResult.value : null,
      timestamp: new Date()
    };
  } catch (error) {
    logger.error('Scraper operation failed', error);
    throw error;
  }
}

export async function runSingleScraper(type) {
  try {
    logger.info(`Starting ${type} scraper...`);

    switch (type) {
      case 'forex':
        return await scrapeAndStoreForex();
      case 'news':
        return await scrapeAllCountriesNews();
      default:
        throw new Error(`Unknown scraper type: ${type}`);
    }
  } catch (error) {
    logger.error(`${type} scraper failed`, error);
    throw error;
  }
}