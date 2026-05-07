import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { getHistoricalData, saveIntelligenceReport, getIntelligenceHistory } from '../../../shared/utils/storage.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key' // Use env var in production
});

const app = express();
const PORT = 4003;

app.use(cors());
app.use(express.json());

// AI Country Briefing Generator
async function generateCountryBriefing(country, marketData, news) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'mock-key') {
    // Mock briefing for development
    return `
      **${country} Economic Intelligence Briefing**

      **Market Overview:**
      - Forex Rate: ${marketData.forex} USD/${country === 'GH' ? 'GHS' : country === 'NG' ? 'NGN' : 'KES'}
      - Fuel Prices: Petrol ${marketData.fuel.petrol}, Diesel ${marketData.fuel.diesel}
      - Inflation: ${marketData.inflation}%

      **Key Insights:**
      - Economic stability shows moderate trends with potential forex volatility
      - Fuel pricing indicates supply chain resilience
      - Inflation monitoring critical for business planning

      **Recommendations:**
      - Monitor forex fluctuations closely
      - Consider hedging strategies for imports
      - Track government policy announcements

      **Risk Assessment:** Medium
    `;
  }

  try {
    const prompt = `
      Generate a comprehensive economic intelligence briefing for ${country} based on the following data:

      Market Data: ${JSON.stringify(marketData)}
      Recent News: ${JSON.stringify(news)}

      Structure the briefing as:
      1. Executive Summary
      2. Market Analysis
      3. Risk Assessment
      4. Business Implications
      5. Recommendations

      Keep it professional and actionable.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'AI briefing generation failed. Using fallback analysis.';
  }
}

// Anomaly detection
async function detectAnomalies(country, currentData) {
  const historical = await getHistoricalData(country, 30);
  if (historical.length < 7) return null; // Need some history

  const recent = historical.slice(-7);
  const avgForex = recent.reduce((sum, d) => sum + d.forex, 0) / recent.length;
  const avgInflation = recent.reduce((sum, d) => sum + d.inflation, 0) / recent.length;

  const anomalies = [];
  if (Math.abs(currentData.forex - avgForex) / avgForex > 0.05) {
    anomalies.push('Significant forex movement detected');
  }
  if (currentData.inflation > avgInflation * 1.1) {
    anomalies.push('Inflation spike above normal range');
  }

  return anomalies.length > 0 ? anomalies : null;
}

// Routes
app.post('/process-market-data', async (req, res) => {
  const data = req.body;
  const insight = generateInsight(data);
  const anomalies = await detectAnomalies(data.country, data);
  const result = {
    country: data.country,
    insight: insight.trim(),
    riskLevel: data.inflation > 20 ? 'high' : 'medium',
    anomalies: anomalies || [],
    timestamp: new Date()
  };

  // Save intelligence report
  await saveIntelligenceReport(data.country, result);

  res.json(result);
});

app.get('/:country', async (req, res) => {
  const country = req.params.country.toUpperCase();
  // Mock current data for demo
  const mockData = { country, forex: 15.2, fuel: { petrol: 15.8 }, inflation: 23.1 };
  const insight = generateInsight(mockData);
  const anomalies = await detectAnomalies(country, mockData);
  const result = {
    country,
    insight: insight.trim(),
    riskLevel: 'medium',
    anomalies: anomalies || [],
    timestamp: new Date()
  };
  res.json(result);
});

app.get('/briefing/:country', async (req, res) => {
  const country = req.params.country.toUpperCase();

  try {
    // Get latest market data
    const marketHistory = await getHistoricalData(country, 1);
    const marketData = marketHistory[0];

    // Mock news for now
    const news = [
      { title: 'Economic update', summary: 'Latest market developments' }
    ];

    if (!marketData) {
      return res.status(404).json({ error: 'No market data available' });
    }

    const briefing = await generateCountryBriefing(country, marketData, news);

    const result = {
      country,
      briefing,
      generatedAt: new Date(),
      dataSource: marketData
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate briefing' });
  }
});