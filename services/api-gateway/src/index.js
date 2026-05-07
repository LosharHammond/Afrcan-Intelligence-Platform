import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Gateway Routes
app.use('/api/v1/countries', (req, res) => {
  // For now, redirect to country-service (when implemented)
  // res.redirect('http://localhost:4001' + req.url);
  res.json({ message: 'Country service not implemented yet', countries: ['GH', 'NG', 'KE', 'ZA'] });
});

app.use('/api/v1/market', (req, res) => {
  // Redirect to market-service
  res.redirect('http://localhost:4002' + req.url);
});

app.use('/api/v1/intelligence', (req, res) => {
  // Redirect to intelligence-service
  res.redirect('http://localhost:4003' + req.url);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});