export interface ForexRate {
  currency: string;
  rate: number;
  change: number;
  timestamp: Date;
}

export interface FuelPrice {
  type: 'petrol' | 'diesel';
  price: number;
  unit: string;
  timestamp: Date;
}

export interface JobData {
  sector: string;
  count: number;
  growth: number;
  timestamp: Date;
}

export interface MarketData {
  forex: ForexRate[];
  fuel: FuelPrice[];
  jobs: JobData[];
}