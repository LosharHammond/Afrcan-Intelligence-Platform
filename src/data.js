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
    trendSignals: ['Cedi confidence improving', 'Mobile-money adoption rising', 'Retail baskets remain fuel-sensitive'],
    competitorSignals: ['Mobile-money providers expanding merchant tools', 'Digital lenders testing SME credit products'],
    benchmark: {
      inflation: 'Disinflation',
      forex: 'Stabilizing',
      hiring: 'Growing',
      pricing: 'Fuel-sensitive',
      competitorActivity: 'Moderate'
    },
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
    trendSignals: ['Consumer purchasing power under pressure', 'Fintech hiring resilient', 'Policy and FX changes moving quickly'],
    competitorSignals: ['Payment companies deepening agent networks', 'Digital banks competing on transfers and savings'],
    benchmark: {
      inflation: 'High',
      forex: 'Volatile',
      hiring: 'Resilient',
      pricing: 'Rising',
      competitorActivity: 'High'
    },
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
    trendSignals: ['Nairobi remote hiring active', 'Telecom bundle competition visible', 'Logistics and mobile-money signals reinforcing growth'],
    competitorSignals: ['Mobile-money ecosystems bundling merchant services', 'Logistics startups tracking regional corridor demand'],
    benchmark: {
      inflation: 'Moderate',
      forex: 'Stable',
      hiring: 'Active',
      pricing: 'Competitive',
      competitorActivity: 'High'
    },
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
    trendSignals: ['Enterprise technology demand steady', 'Energy and rate sensitivity remain key risks', 'Retail pricing data is comparatively trackable'],
    competitorSignals: ['Enterprise SaaS providers competing on workflow automation', 'Financial services firms monitoring customer affordability'],
    benchmark: {
      inflation: 'Moderate',
      forex: 'Stable',
      hiring: 'Steady',
      pricing: 'Trackable',
      competitorActivity: 'Moderate'
    },
    opportunities: ['Enterprise competitor intel', 'Capital-market dashboards', 'Retail basket tracking']
  }
];

export const platformCapabilities = [
  {
    name: 'Select a country',
    summary: 'Move between Ghana, Nigeria, Kenya, and South Africa from one country intelligence model.'
  },
  {
    name: 'View live intelligence',
    summary: 'Surface live-ready operating signals across forex, inflation, fuel, jobs, pricing, policy, and news.'
  },
  {
    name: 'Analyze trends',
    summary: 'Turn time-series indicators into deltas, anomaly flags, market direction, and executive context.'
  },
  {
    name: 'Compare economies',
    summary: 'Benchmark countries by macro pressure, hiring resilience, pricing movement, and competitor activity.'
  },
  {
    name: 'Monitor competitors',
    summary: 'Track market moves by fintechs, telecoms, retailers, logistics players, banks, and enterprise software firms.'
  },
  {
    name: 'Receive AI summaries',
    summary: 'Generate AI country briefings that explain what changed, why it matters, and what to watch next.'
  },
  {
    name: 'Track business indicators',
    summary: 'Maintain normalized indicators for country, sector, source confidence, timestamp, and comparable unit.'
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
    name: 'AI Country Briefings',
    summary: 'Narrative summaries that connect macro pressure, hiring resilience, policy movement, and demand signals.',
    feeds: ['Normalized indicators', 'Verified news context', 'Country models', 'Executive prompt templates']
  },
  {
    name: 'News Intelligence Layer',
    summary: 'AI summaries of business news, economic shifts, policy changes, investment trends, and competitor moves.',
    feeds: ['Business publications', 'Government updates', 'Investor announcements', 'Policy trackers']
  }
];
