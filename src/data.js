export const countries = [
  {
    id: 'ghana',
    name: 'Ghana',
    flag: '🇬🇭',
    capital: 'Accra',
    currency: 'GHS',
    thesis: 'A digitally active West African gateway where cedi stability, fuel costs, and fintech adoption shape consumer demand.',
    briefing:
      'Ghana’s improving currency confidence is creating room for retail recovery, but fuel sensitivity and salary pressure still constrain household spending.',
    indicators: [
      { label: 'Forex monitor', value: 'GHS/USD', tone: 'stable' },
      { label: 'Inflation watch', value: 'Disinflation', tone: 'good' },
      { label: 'Fuel pressure', value: 'Medium', tone: 'watch' },
      { label: 'Tech hiring', value: 'Growing', tone: 'good' }
    ],
    opportunities: ['Mobile money analytics', 'SME credit scoring', 'Retail price tracking']
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    flag: '🇳🇬',
    capital: 'Abuja',
    currency: 'NGN',
    thesis: 'Africa’s largest consumer market and fintech laboratory, with high volatility but unmatched signal density.',
    briefing:
      'Nigeria’s inflationary pressure continues to weaken consumer purchasing power while fintech hiring remains resilient across Lagos and remote roles.',
    indicators: [
      { label: 'Forex monitor', value: 'NGN/USD', tone: 'watch' },
      { label: 'Inflation watch', value: 'High', tone: 'risk' },
      { label: 'Fuel pressure', value: 'High', tone: 'risk' },
      { label: 'Fintech hiring', value: 'Resilient', tone: 'good' }
    ],
    opportunities: ['Fintech competitor monitoring', 'Consumer price intelligence', 'Policy risk alerts']
  },
  {
    id: 'kenya',
    name: 'Kenya',
    flag: '🇰🇪',
    capital: 'Nairobi',
    currency: 'KES',
    thesis: 'East Africa’s innovation hub where mobile money, logistics, agritech, and policy shifts quickly influence regional markets.',
    briefing:
      'Kenya’s digital economy remains comparatively resilient as Nairobi hiring and mobile-money ecosystems offset pockets of consumer price pressure.',
    indicators: [
      { label: 'Forex monitor', value: 'KES/USD', tone: 'stable' },
      { label: 'Inflation watch', value: 'Moderate', tone: 'stable' },
      { label: 'Remote jobs', value: 'Active', tone: 'good' },
      { label: 'Telecom pricing', value: 'Competitive', tone: 'good' }
    ],
    opportunities: ['Mobile-money benchmarking', 'Logistics pricing', 'Remote talent intelligence']
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    flag: '🇿🇦',
    capital: 'Pretoria',
    currency: 'ZAR',
    thesis: 'The continent’s deepest capital market and enterprise technology base, with strong data availability for benchmarking.',
    briefing:
      'South Africa’s enterprise technology market shows steady demand, while energy costs and interest-rate sensitivity remain core operating risks.',
    indicators: [
      { label: 'Forex monitor', value: 'ZAR/USD', tone: 'stable' },
      { label: 'Interest rates', value: 'Elevated', tone: 'watch' },
      { label: 'Finance hiring', value: 'Steady', tone: 'good' },
      { label: 'Retail pricing', value: 'Trackable', tone: 'stable' }
    ],
    opportunities: ['Enterprise competitor intel', 'Capital-market dashboards', 'Retail basket tracking']
  }
];

export const modules = [
  {
    name: 'Economic Intelligence',
    summary: 'Forex, inflation, fuel prices, interest rates, commodity prices, and country-level trend deltas.',
    feeds: ['Central bank releases', 'Fuel regulators', 'Commodity benchmarks', 'FX market feeds']
  },
  {
    name: 'Job Market Intelligence',
    summary: 'Tech hiring, finance hiring, remote jobs, salary bands, company momentum, and skill-demand shifts.',
    feeds: ['Job boards', 'Company career pages', 'Salary reports', 'Remote-work platforms']
  },
  {
    name: 'Market & Pricing Intelligence',
    summary: 'Telecom bundles, internet prices, e-commerce baskets, supermarket trends, and consumer affordability signals.',
    feeds: ['Telecom tariffs', 'Online stores', 'Supermarket catalogs', 'Price crawlers']
  },
  {
    name: 'News Intelligence Layer',
    summary: 'AI summaries of business news, economic shifts, policy changes, investment trends, and competitor moves.',
    feeds: ['Business publications', 'Government updates', 'Investor announcements', 'Policy trackers']
  }
];
