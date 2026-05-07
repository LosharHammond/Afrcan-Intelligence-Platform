import { useState, useEffect } from 'react'
import { login, getCountryData, getInsights, getNews, getHistoricalData, getIntelligenceBriefing } from './services/api'
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [data, setData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [news, setNews] = useState(null);
  const [historical, setHistorical] = useState(null);
  const [briefing, setBriefing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('gh');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login(loginForm);
      setUser(result.user);
      localStorage.setItem('token', result.token);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadCountryData = async (country) => {
    setLoading(true);
    try {
      const [marketData, insightData, newsData, histData, briefData] = await Promise.all([
        getCountryData(country),
        getInsights(country),
        getNews(country),
        getHistoricalData(country, 7),
        getIntelligenceBriefing(country)
      ]);
      setData(marketData);
      setInsights(insightData);
      setNews(newsData);
      setHistorical(histData);
      setBriefing(briefData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token (simplified)
      setUser({ email: 'admin@nexara.com' });
      loadCountryData(selectedCountry);
    }
  }, [selectedCountry]);

  if (!user) {
    return (
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
        <h1>Nexara Intelligence Platform</h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px' }}>Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p style={{ fontSize: '12px', marginTop: '10px' }}>Demo: admin@nexara.com / password123</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Nexara Intelligence Platform</h1>
        <div>
          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="gh">Ghana</option>
            <option value="ng">Nigeria</option>
            <option value="ke">Kenya</option>
            <option value="za">South Africa</option>
          </select>
          <button onClick={() => setUser(null)} style={{ marginLeft: '10px' }}>Logout</button>
        </div>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {data && (
          <div style={{ border: '1px solid #ccc', padding: '15px' }}>
            <h2>Market Data</h2>
            <p>Forex: {data.forex}</p>
            <p>Fuel (Petrol): {data.fuel.petrol}</p>
            <p>Fuel (Diesel): {data.fuel.diesel}</p>
            <p>Inflation: {data.inflation}%</p>
          </div>
        )}

        {insights && (
          <div style={{ border: '1px solid #ccc', padding: '15px' }}>
            <h2>AI Insights</h2>
            <p>{insights.insight}</p>
            <p>Risk Level: {insights.riskLevel}</p>
            {insights.anomalies && insights.anomalies.length > 0 && (
              <div>
                <h3>Anomalies:</h3>
                <ul>
                  {insights.anomalies.map((anomaly, i) => (
                    <li key={i}>{anomaly}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {news && news.news && (
          <div style={{ border: '1px solid #ccc', padding: '15px' }}>
            <h2>Latest News</h2>
            {news.news.slice(0, 3).map((item, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <h4>{item.title}</h4>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        )}

        {briefing && (
          <div style={{ border: '1px solid #ccc', padding: '15px' }}>
            <h2>AI Country Briefing</h2>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{briefing.briefing}</pre>
          </div>
        )}
      </div>

      {historical && historical.historical && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
          <h2>Historical Trends (Last 7 Days)</h2>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
            {historical.historical.map((item, i) => (
              <div key={i} style={{ border: '1px solid #eee', padding: '10px', minWidth: '120px' }}>
                <p>{new Date(item.timestamp).toLocaleDateString()}</p>
                <p>Forex: {item.forex}</p>
                <p>Inflation: {item.inflation}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App