/**
 * Database Migration: Create market_data table
 * Version: 001
 */

export async function up(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS market_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT NOT NULL,
      forex REAL,
      fuel_petrol REAL,
      fuel_diesel REAL,
      inflation REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_market_country_timestamp 
    ON market_data(country, created_at);
  `);
}

export async function down(db) {
  db.exec(`
    DROP INDEX IF EXISTS idx_market_country_timestamp;
    DROP TABLE IF EXISTS market_data;
  `);
}