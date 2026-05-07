import express from 'express';
import cors from 'cors';
import { getCurrentMarketData, getHistoricalMarketData } from './controllers/marketController.js';
import Logger from '../../shared/utils/logger.js';

const app = express();
const PORT = 4002;
const logger = new Logger('MarketService');

app.use(cors());
app.use(express.json());

// Routes
app.get('/:country', getCurrentMarketData);
app.get('/historical/:country', getHistoricalMarketData);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Market Service online', timestamp: new Date() });
});

// Error handling
app.use((err, req, res, next) => {
  logger.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  logger.info(`Market Service running on port ${PORT}`);
});
  res.json({ country, historical: data });
});