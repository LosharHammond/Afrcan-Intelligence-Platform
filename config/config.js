/**
 * Application Configuration
 * Centralized environment and config management
 */

export const config = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  
  // External APIs
  apis: {
    forex: {
      baseUrl: 'https://open.er-api.com/v6',
      timeout: 5000
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY || '',
      model: 'gpt-4'
    },
    news: {
      apiKey: process.env.NEWS_API_KEY || ''
    }
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'nexara-secret-key',
    expiresIn: '24h'
  },

  // Database
  database: {
    path: process.env.DATABASE_PATH || './database/nexara.db',
    url: process.env.DATABASE_URL || ''
  },

  // Services
  services: {
    gateway: 'http://localhost:5000',
    market: 'http://localhost:4002',
    intelligence: 'http://localhost:4003',
    news: 'http://localhost:4004',
    auth: 'http://localhost:4005'
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};

export function getEnv(key, defaultValue = null) {
  const value = process.env[key];
  if (!value && !defaultValue) {
    console.warn(`Missing environment variable: ${key}`);
  }
  return value || defaultValue;
}