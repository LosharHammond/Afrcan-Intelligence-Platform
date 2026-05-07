import cron from 'node-cron';
import axios from 'axios';

// Service URLs
const MARKET_SERVICE = 'http://localhost:4002';
const INTELLIGENCE_SERVICE = 'http://localhost:4003';
const NEWS_SERVICE = 'http://localhost:4004';

const COUNTRIES = ['GH', 'NG', 'KE', 'ZA'];

async function collectMarketData(country) {
  try {
    const response = await axios.get(`${MARKET_SERVICE}/${country}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to collect market data for ${country}:`, error.message);
    return null;
  }
}

async function processIntelligence(country, marketData) {
  try {
    const response = await axios.post(`${INTELLIGENCE_SERVICE}/process-market-data`, marketData);
    return response.data;
  } catch (error) {
    console.error(`Failed to process intelligence for ${country}:`, error.message);
    return null;
  }
}

async function collectNews(country) {
  try {
    const response = await axios.get(`${NEWS_SERVICE}/${country}`);
    return response.data.news || [];
  } catch (error) {
    console.error(`Failed to collect news for ${country}:`, error.message);
    return [];
  }
}

async function generateDailyBriefing(country) {
  try {
    const response = await axios.get(`${INTELLIGENCE_SERVICE}/briefing/${country}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to generate briefing for ${country}:`, error.message);
    return null;
  }
}

async function runDailyIntelligence() {
  console.log('🚀 Starting daily intelligence collection...');

  for (const country of COUNTRIES) {
    console.log(`📊 Processing ${country}...`);

    // Collect fresh market data
    const marketData = await collectMarketData(country);
    if (!marketData) continue;

    // Process intelligence
    const intelligence = await processIntelligence(country, marketData);
    if (intelligence) {
      console.log(`✅ Intelligence processed for ${country}`);
    }

    // Collect news
    const news = await collectNews(country);
    console.log(`📰 Collected ${news.length} news items for ${country}`);

    // Generate AI briefing
    const briefing = await generateDailyBriefing(country);
    if (briefing) {
      console.log(`🤖 AI briefing generated for ${country}`);
    }

    // Small delay to avoid overwhelming services
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('✅ Daily intelligence collection completed');
}

// Run immediately for testing, then schedule for daily execution
console.log('🔄 Running initial intelligence collection...');
runDailyIntelligence();

// Schedule for daily execution at 6 AM UTC
cron.schedule('0 6 * * *', () => {
  console.log('⏰ Running scheduled daily intelligence collection...');
  runDailyIntelligence();
}, {
  timezone: 'UTC'
});

console.log('📅 Daily intelligence worker started - runs at 6 AM UTC daily');