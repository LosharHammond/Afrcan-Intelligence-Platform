/**
 * Environment validation utility
 * Ensures all required environment variables are set at startup
 */

import Logger from './logger.js';

const logger = new Logger('EnvValidator');

const REQUIRED_VARS = {
  development: [],
  production: [
    'JWT_SECRET',
    'OPENAI_API_KEY'
  ]
};

const OPTIONAL_VARS = [
  'NEWS_API_KEY',
  'DATABASE_PATH',
  'LOG_LEVEL'
];

export function validateEnvironment() {
  const environment = process.env.NODE_ENV || 'development';
  const required = REQUIRED_VARS[environment] || [];
  const missing = [];

  for (const variable of required) {
    if (!process.env[variable]) {
      missing.push(variable);
    }
  }

  if (missing.length > 0) {
    logger.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  const warnings = [];
  for (const variable of OPTIONAL_VARS) {
    if (!process.env[variable]) {
      warnings.push(variable);
    }
  }

  if (warnings.length > 0) {
    logger.warn(`Missing optional environment variables: ${warnings.join(', ')}`);
  }

  logger.info(`Environment validation passed (${environment})`);
  return true;
}