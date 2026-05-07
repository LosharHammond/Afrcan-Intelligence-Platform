import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 4004;

app.use(cors());
app.use(express.json());

// News fetcher (mock for now - replace with NewsAPI)
async function getCountryNews(country) {
  // Mock news data - in production, use NewsAPI or similar
  const mockNews = {
    GH: [
      { title: 'Ghana inflation rises to 23%', summary: 'Economic pressures continue...', date: new Date() },
      { title: 'Cedi weakens against USD', summary: 'Forex market volatility...', date: new Date() }
    ],
    NG: [
      { title: 'Nigeria fuel prices stable', summary: 'Government subsidies maintain...', date: new Date() },
      { title: 'Economic growth projections', summary: 'IMF forecasts 3.5% growth...', date: new Date() }
    ],
    KE: [
      { title: 'Kenya shilling strengthens', summary: 'Improved forex reserves...', date: new Date() },
      { title: 'East African trade bloc meeting', summary: 'Regional economic cooperation...', date: new Date() }
    ],
    ZA: [
      { title: 'South Africa inflation concerns', summary: 'Reserve Bank monitors...', date: new Date() },
      { title: 'Mining sector recovery', summary: 'Commodity prices boost exports...', date: new Date() }
    ]
  };
  return mockNews[country] || [];
}

// Routes
app.get('/:country', async (req, res) => {
  const country = req.params.country.toUpperCase();
  const news = await getCountryNews(country);
  res.json({ country, news, timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`News Service running on port ${PORT}`);
});