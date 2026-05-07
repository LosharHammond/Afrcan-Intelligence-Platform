/**
 * Database Seed: Initial countries data
 */

export async function seed(db) {
  const countries = [
    { code: 'GH', name: 'Ghana', currency: 'GHS', capital: 'Accra' },
    { code: 'NG', name: 'Nigeria', currency: 'NGN', capital: 'Abuja' },
    { code: 'KE', name: 'Kenya', currency: 'KES', capital: 'Nairobi' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR', capital: 'Pretoria' }
  ];

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO countries (code, name, currency, capital)
    VALUES (?, ?, ?, ?)
  `);

  for (const country of countries) {
    stmt.run(country.code, country.name, country.currency, country.capital);
  }
}