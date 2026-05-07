import { CountryCode } from '../constants/countries';

export interface Country {
  code: CountryCode;
  name: string;
  currency: string;
  capital: string;
}

export interface CountryData {
  country: Country;
  lastUpdated: Date;
  // Add more fields as needed
}