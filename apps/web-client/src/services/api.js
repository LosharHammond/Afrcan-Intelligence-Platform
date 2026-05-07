const API_BASE = "http://localhost:5000/api/v1";

export async function login(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function getCountries() {
  const res = await fetch(`${API_BASE}/countries`);
  if (!res.ok) throw new Error('Failed to fetch countries');
  return res.json();
}

export async function getCountryData(country) {
  const res = await fetch(`${API_BASE}/market/${country}`);
  if (!res.ok) throw new Error('Failed to fetch market data');
  return res.json();
}

export async function getInsights(country) {
  const res = await fetch(`${API_BASE}/intelligence/${country}`);
  if (!res.ok) throw new Error('Failed to fetch intelligence data');
  return res.json();
}

export async function getNews(country) {
  const res = await fetch(`${API_BASE}/news/${country}`);
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

export async function getHistoricalData(country, limit = 30) {
  const res = await fetch(`${API_BASE}/market/historical/${country}?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch historical data');
  return res.json();
}

export async function getIntelligenceBriefing(country) {
  const res = await fetch(`${API_BASE}/intelligence/briefing/${country}`);
  if (!res.ok) throw new Error('Failed to fetch briefing');
  return res.json();
}