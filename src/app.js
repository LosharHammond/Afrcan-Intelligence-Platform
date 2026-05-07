import { countries, modules } from './data.js';

const tabs = document.querySelector('#country-tabs');
const panel = document.querySelector('#country-panel');
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

tabs.addEventListener('click', (event) => {
  const button = event.target.closest('[data-country-id]');
  if (!button) return;

  selectedCountry = countries.find((country) => country.id === button.dataset.countryId);
  renderTabs();
  renderCountryPanel();
});

renderTabs();
renderCountryPanel();
renderModules();
renderBriefings();
