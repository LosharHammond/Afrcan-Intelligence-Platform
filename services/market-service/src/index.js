import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 4002;

app.use(cors());
app.use(express.json());

// Forex fetcher
async function getForex(countryCurrency) {
  try {
    const res = await axios.get('https://open.er-api.com/v6/latest/USD');
    return {
      usdToLocal: res.data.rates[countryCurrency],
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error fetching forex:', error);
    return null;
  }
}

// Routes
app.get('/forex/:country', async (req, res) => {
  const country = req.params.country.toUpperCase();
  const currencyMap = { GH: 'GHS', NG: 'NGN', KE: 'KES', ZA: 'ZAR' };
  const currency = currencyMap[country];

  if (!currency) {
    return res.status(400).json({ error: 'Country not supported' });
  }

  const data = await getForex(currency);
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to fetch forex data' });
  }
});

// Mock other market data for now
app.get('/:country', (req, res) => {
  const country = req.params.country.toUpperCase();
  const mockData = {
    country,
    forex: 15.2, // Will be replaced with real data
    fuel: 15.8,
    inflation: 23.1,
    timestamp: new Date()
  };
  res.json(mockData);
});

app.listen(PORT, () => {
  console.log(`Market Service running on port ${PORT}`);
});