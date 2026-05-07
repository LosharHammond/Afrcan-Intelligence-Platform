import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { rateLimit } from './middleware/rateLimit.js';
import { ApiResponse, sendResponse } from '../../shared/utils/response.js';
import Logger from '../../shared/utils/logger.js';

const app = express();
const PORT = process.env.PORT || 5000;
const logger = new Logger('APIGateway');

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(rateLimit(900000, 100)); // 100 requests per 15 minutes

// Authentication middleware (simplified - integrate with auth-service)
function authenticateToken(req, res, next) {
  // For MVP, include token verification here
  // const token = req.headers['authorization']?.split(' ')[1];
  // if (!token) return res.status(401).json({ error: 'No token' });
  next();
}

// Health check endpoint
app.get('/health', (req, res) => {
  sendResponse(res, ApiResponse.success(
    { status: 'running', timestamp: new Date() },
    'API Gateway healthy'
  ));
});

// Countries endpoint
app.get('/api/v1/countries', authenticateToken, (req, res) => {
  sendResponse(res, ApiResponse.success(
    {
      countries: [
        { code: 'GH', name: 'Ghana', currency: 'GHS' },
        { code: 'NG', name: 'Nigeria', currency: 'NGN' },
        { code: 'KE', name: 'Kenya', currency: 'KES' },
        { code: 'ZA', name: 'South Africa', currency: 'ZAR' }
      ]
    },
    'Countries retrieved successfully'
  ));
});

// Service proxies with error handling
const createServiceProxy = (target, name) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    onError: (err, req, res) => {
      logger.error(`${name} service error`, err);
      sendResponse(res, ApiResponse.error(
        `${name} service temporarily unavailable`,
        503
      ));
    }
  });
};

app.use('/api/v1/market', authenticateToken, createServiceProxy('http://localhost:4002', 'Market'));
app.use('/api/v1/intelligence', authenticateToken, createServiceProxy('http://localhost:4003', 'Intelligence'));
app.use('/api/v1/news', authenticateToken, createServiceProxy('http://localhost:4004', 'News'));
app.use('/api/v1/auth', createServiceProxy('http://localhost:4005', 'Auth'));

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});