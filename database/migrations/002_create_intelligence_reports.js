/**
 * Database Migration: Create intelligence_reports table
 * Version: 002
 */

export async function up(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS intelligence_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT NOT NULL,
      insight TEXT,
      risk_level TEXT,
      anomalies TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_intelligence_country_timestamp 
    ON intelligence_reports(country, created_at);
  `);
}

export async function down(db) {
  db.exec(`
    DROP INDEX IF EXISTS idx_intelligence_country_timestamp;
    DROP TABLE IF EXISTS intelligence_reports;
  `);
}