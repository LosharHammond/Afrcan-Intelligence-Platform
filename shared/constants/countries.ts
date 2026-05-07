export const COUNTRIES = {
  GH: {
    name: 'Ghana',
    code: 'GH',
    currency: 'GHS',
    capital: 'Accra'
  },
  NG: {
    name: 'Nigeria',
    code: 'NG',
    currency: 'NGN',
    capital: 'Abuja'
  },
  KE: {
    name: 'Kenya',
    code: 'KE',
    currency: 'KES',
    capital: 'Nairobi'
  },
  ZA: {
    name: 'South Africa',
    code: 'ZA',
    currency: 'ZAR',
    capital: 'Pretoria'
  }
} as const;

export type CountryCode = keyof typeof COUNTRIES;