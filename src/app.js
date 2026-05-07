import { countries, modules, platformCapabilities } from './data.js';

const tabs = document.querySelector('#country-tabs');
const panel = document.querySelector('#country-panel');
const capabilityGrid = document.querySelector('#capability-grid');
const comparisonTable = document.querySelector('#comparison-table');
const trendList = document.querySelector('#trend-list');
const competitorList = document.querySelector('#competitor-list');
const moduleGrid = document.querySelector('#module-grid');
const briefingStack = document.querySelector('#briefing-stack');

let selectedCountry = countries[1];

function toneLabel(tone) {
  return {
    good: 'Positive',
    stable: 'Stable',
    watch: 'Watch',
    risk: 'Risk'
  }[tone];
}

function renderTabs() {
  tabs.innerHTML = countries
    .map(
      (country) => `
        <button class="country-tab ${country.id === selectedCountry.id ? 'active' : ''}" data-country-id="${country.id}" role="tab" aria-selected="${country.id === selectedCountry.id}">
          <span>${country.flag}</span>
          <strong>${country.name}</strong>
          <small>${country.currency}</small>
        </button>
      `
    )
    .join('');
}

function renderCountryPanel() {
  panel.innerHTML = `
    <div class="country-panel__header">
      <div>
        <p class="eyebrow">${selectedCountry.capital} · ${selectedCountry.currency}</p>
        <h3>${selectedCountry.flag} ${selectedCountry.name}</h3>
      </div>
      <span class="status-pill">Live-ready model</span>
    </div>
    <p class="country-thesis">${selectedCountry.thesis}</p>
    <div class="indicator-grid">
      ${selectedCountry.indicators
        .map(
          (indicator) => `
            <div class="indicator-card ${indicator.tone}">
              <span>${indicator.label}</span>
              <strong>${indicator.value}</strong>
              <small>${toneLabel(indicator.tone)}</small>
            </div>
          `
        )
        .join('')}
    </div>
    <div class="briefing-card featured">
      <span>AI country briefing</span>
      <p>${selectedCountry.briefing}</p>
    </div>
    <div class="opportunity-row">
      ${selectedCountry.opportunities.map((item) => `<span>${item}</span>`).join('')}
    </div>
  `;

  document.querySelector('#hero-briefing-title').textContent = `${selectedCountry.name} operating signal`;
  document.querySelector('#hero-briefing').textContent = selectedCountry.briefing;
  document.querySelector('#hero-inflation').textContent = selectedCountry.indicators[1].value;
  document.querySelector('#hero-forex').textContent = selectedCountry.indicators[0].value;
  document.querySelector('#hero-hiring').textContent = selectedCountry.indicators.at(-1).value;
  renderSelectedCountryMonitors();
}

function renderCapabilities() {
  capabilityGrid.innerHTML = platformCapabilities
    .map(
      (capability, index) => `
        <article class="capability-card">
          <span>${String(index + 1).padStart(2, '0')}</span>
          <h3>${capability.name}</h3>
          <p>${capability.summary}</p>
        </article>
      `
    )
    .join('');
}

function renderComparisonTable() {
  comparisonTable.innerHTML = `
    <div class="comparison-row comparison-head">
      <span>Country</span>
      <span>Inflation</span>
      <span>Forex</span>
      <span>Hiring</span>
      <span>Pricing</span>
      <span>Competitors</span>
    </div>
    ${countries
      .map(
        (country) => `
          <button class="comparison-row ${country.id === selectedCountry.id ? 'active' : ''}" data-country-id="${country.id}">
            <span>${country.flag} ${country.name}</span>
            <span>${country.benchmark.inflation}</span>
            <span>${country.benchmark.forex}</span>
            <span>${country.benchmark.hiring}</span>
            <span>${country.benchmark.pricing}</span>
            <span>${country.benchmark.competitorActivity}</span>
          </button>
        `
      )
      .join('')}
  `;
}

function renderSelectedCountryMonitors() {
  trendList.innerHTML = selectedCountry.trendSignals.map((signal) => `<li>${signal}</li>`).join('');
  competitorList.innerHTML = selectedCountry.competitorSignals.map((signal) => `<li>${signal}</li>`).join('');
  renderComparisonTable();
}

function renderModules() {
  moduleGrid.innerHTML = modules
    .map(
      (module, index) => `
        <article class="module-card">
          <span class="module-index">0${index + 1}</span>
          <h3>${module.name}</h3>
          <p>${module.summary}</p>
          <ul>
            ${module.feeds.map((feed) => `<li>${feed}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');
}

function renderBriefings() {
  briefingStack.innerHTML = countries
    .map(
      (country) => `
        <article class="briefing-card">
          <span>${country.flag} ${country.name}</span>
          <p>${country.briefing}</p>
        </article>
      `
    )
    .join('');
}

function selectCountry(countryId) {
  selectedCountry = countries.find((country) => country.id === countryId);
  renderTabs();
  renderCountryPanel();
}

tabs.addEventListener('click', (event) => {
  const button = event.target.closest('[data-country-id]');
  if (!button) return;
  selectCountry(button.dataset.countryId);
});

comparisonTable.addEventListener('click', (event) => {
  const button = event.target.closest('[data-country-id]');
  if (!button) return;
  selectCountry(button.dataset.countryId);
});

renderCapabilities();
renderTabs();
renderCountryPanel();
renderModules();
renderBriefings();
