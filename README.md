# NEXARA

NEXARA is a real-time AI-powered operational intelligence platform for African markets. The product is positioned as a continental intelligence infrastructure layer, not a local dashboard.

## What the prototype covers

Yes — the code now maps the full platform vision into the product structure:

- **Branding**: NEXARA is presented as the named category-level platform for African market intelligence.
- **Architecture**: the interface and documentation describe ingestion, normalization, analysis, AI summarization, distribution, and monetization.
- **Data modeling**: countries are structured with indicators, benchmark metrics, trend signals, competitor signals, opportunities, and AI briefings.
- **Scalability**: the data model separates countries, capabilities, and modules so additional countries or verticals can be added without redesigning the UI.
- **UI structure**: users can select countries, view live-ready intelligence, compare economies, analyze trend signals, monitor competitors, receive AI summaries, and track business indicators.
- **Monetization**: the architecture includes premium alerts, API access, sector reports, team workspaces, and enterprise seats.

## Initial country coverage

NEXARA starts with four high-signal African markets:

- Ghana
- Nigeria
- Kenya
- South Africa

These countries provide strong starting points because they combine fintech activity, economic relevance, stronger digital ecosystems, and better public-data availability.

## Platform modules

1. **Economic Intelligence** — forex, inflation, fuel prices, interest rates, and commodity prices.
2. **Job Market Intelligence** — tech hiring, finance hiring, remote jobs, and salary trends.
3. **Market & Pricing Intelligence** — telecom prices, internet bundles, e-commerce prices, and supermarket trends.
4. **AI Country Briefings** — concise country narratives that connect economic pressure, hiring resilience, policy movement, and consumer demand.
5. **News Intelligence Layer** — AI summaries of business news, economic shifts, policy changes, and investment trends.

## Product architecture vision

NEXARA is modeled around a scalable pipeline:

1. **Ingest** market, pricing, policy, job, commodity, and news feeds.
2. **Normalize** by country, city, sector, indicator, source confidence, timestamp, and comparable unit.
3. **Analyze** trend deltas, anomalies, cross-country benchmarks, and AI-generated summaries.
4. **Monetize** through premium alerts, API access, sector reports, team workspaces, and enterprise seats.

## Local development

This repository currently ships a dependency-free static prototype.

```bash
npm run check
npm start
```

Then open <http://127.0.0.1:4173>.
