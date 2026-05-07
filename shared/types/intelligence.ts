export interface Insight {
  id: string;
  title: string;
  summary: string;
  content: string;
  type: 'trend' | 'anomaly' | 'forecast' | 'alert';
  confidence: number;
  timestamp: Date;
}

export interface IntelligenceReport {
  countryCode: string;
  insights: Insight[];
  generatedAt: Date;
}