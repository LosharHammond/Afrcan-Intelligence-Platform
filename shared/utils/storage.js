import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'database', 'nexara.db');

// Initialize database
const db = new Database(DB_PATH);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS market_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country TEXT NOT NULL,
    forex REAL,
    fuel_petrol REAL,
    fuel_diesel REAL,
    inflation REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS intelligence_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country TEXT NOT NULL,
    insight TEXT,
    risk_level TEXT,
    anomalies TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_market_country_timestamp ON market_data(country, timestamp);
  CREATE INDEX IF NOT EXISTS idx_intelligence_country_timestamp ON intelligence_reports(country, timestamp);
`);

export async function saveMarketData(country, data) {
  const stmt = db.prepare(`
    INSERT INTO market_data (country, forex, fuel_petrol, fuel_diesel, inflation)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(country, data.forex, data.fuel.petrol, data.fuel.diesel, data.inflation);
}

export async function getHistoricalData(country, limit = 30) {
  const stmt = db.prepare(`
    SELECT * FROM market_data
    WHERE country = ?
    ORDER BY timestamp DESC
    LIMIT ?
  `);
  return stmt.all(country, limit);
}

export async function saveIntelligenceReport(country, report) {
  const stmt = db.prepare(`
    INSERT INTO intelligence_reports (country, insight, risk_level, anomalies)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(country, report.insight, report.riskLevel, JSON.stringify(report.anomalies));
}

export async function getIntelligenceHistory(country, limit = 10) {
  const stmt = db.prepare(`
    SELECT * FROM intelligence_reports
    WHERE country = ?
    ORDER BY timestamp DESC
    LIMIT ?
  `);
  const rows = stmt.all(country, limit);
  return rows.map(row => ({
    ...row,
    anomalies: JSON.parse(row.anomalies || '[]')
  }));
}