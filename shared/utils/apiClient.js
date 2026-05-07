/**
 * API Request Utility
 * Handles common HTTP operations with retry logic
 */

import axios from 'axios';
import Logger from './logger.js';

const logger = new Logger('APIClient');

const DEFAULT_RETRY_COUNT = 3;
const DEFAULT_RETRY_DELAY = 1000;

export class APIClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.timeout = options.timeout || 5000;
    this.retryCount = options.retryCount || DEFAULT_RETRY_COUNT;
    this.retryDelay = options.retryDelay || DEFAULT_RETRY_DELAY;
  }

  async retry(fn, retries = this.retryCount) {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0 && this.isRetryable(error)) {
        logger.warn(`Retrying request (${retries} retries left)`, { error: error.message });
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.retry(fn, retries - 1);
      }
      throw error;
    }
  }

  isRetryable(error) {
    if (!error.response) return true; // Network error
    const status = error.response.status;
    return status === 408 || status === 429 || status >= 500;
  }

  async get(path, config = {}) {
    return this.retry(() =>
      axios.get(`${this.baseURL}${path}`, {
        timeout: this.timeout,
        ...config
      })
    );
  }

  async post(path, data, config = {}) {
    return this.retry(() =>
      axios.post(`${this.baseURL}${path}`, data, {
        timeout: this.timeout,
        ...config
      })
    );
  }

  async put(path, data, config = {}) {
    return this.retry(() =>
      axios.put(`${this.baseURL}${path}`, data, {
        timeout: this.timeout,
        ...config
      })
    );
  }

  async delete(path, config = {}) {
    return this.retry(() =>
      axios.delete(`${this.baseURL}${path}`, {
        timeout: this.timeout,
        ...config
      })
    );
  }
}