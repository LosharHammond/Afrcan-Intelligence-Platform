import { readFile } from 'node:fs/promises';

const requiredFiles = ['index.html', 'src/app.js', 'src/data.js', 'src/styles.css'];
const requiredCopy = [
  'NEXARA',
  'Economic Intelligence',
  'Job Market Intelligence',
  'Market & Pricing Intelligence',
  'News Intelligence Layer',
  'Ghana',
  'Nigeria',
  'Kenya',
  'South Africa',
  'Compare economies',
  'Monitor competitors',
  'AI Country Briefings'
];

for (const file of requiredFiles) {
  await readFile(file, 'utf8');
}

const combined = await Promise.all(requiredFiles.map((file) => readFile(file, 'utf8'))).then((parts) => parts.join('\n'));
const missingCopy = requiredCopy.filter((text) => !combined.includes(text));

if (missingCopy.length > 0) {
  console.error(`Missing required platform copy: ${missingCopy.join(', ')}`);
  process.exit(1);
}

const html = await readFile('index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
const stylesheetMatches = [...html.matchAll(/<link[^>]+href="([^"]+)"[^>]*rel="stylesheet"/g)].map((match) => match[1]);

for (const asset of [...scriptMatches, ...stylesheetMatches].filter((asset) => !asset.startsWith('http'))) {
  await readFile(asset, 'utf8');
}

console.log('Static site check passed.');
