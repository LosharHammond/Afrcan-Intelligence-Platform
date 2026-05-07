/**
 * Centralized logging utility for the platform
 * Provides structured logging with severity levels
 */

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

class Logger {
  constructor(service) {
    this.service = service;
  }

  format(level, message, data = {}) {
    return {
      timestamp: new Date().toISOString(),
      service: this.service,
      level,
      message,
      ...data
    };
  }

  error(message, error = null) {
    const logData = this.format(LOG_LEVELS.ERROR, message, {
      error: error?.message || error,
      stack: error?.stack
    });
    console.error(JSON.stringify(logData));
    return logData;
  }

  warn(message, data = {}) {
    const logData = this.format(LOG_LEVELS.WARN, message, data);
    console.warn(JSON.stringify(logData));
    return logData;
  }

  info(message, data = {}) {
    const logData = this.format(LOG_LEVELS.INFO, message, data);
    console.log(JSON.stringify(logData));
    return logData;
  }

  debug(message, data = {}) {
    if (process.env.NODE_ENV === 'development') {
      const logData = this.format(LOG_LEVELS.DEBUG, message, data);
      console.debug(JSON.stringify(logData));
      return logData;
    }
  }
}

export default Logger;