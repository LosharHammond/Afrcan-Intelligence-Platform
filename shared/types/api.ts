import { CountryData } from './country';
import { MarketData } from './market';
import { IntelligenceReport } from './intelligence';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: Date;
}

export interface CountryApiResponse extends ApiResponse<CountryData> {}
export interface MarketApiResponse extends ApiResponse<MarketData> {}
export interface IntelligenceApiResponse extends ApiResponse<IntelligenceReport> {}