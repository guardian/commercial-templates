import { readFileSync, writeFileSync } from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

// replicate __dirname functionality as this is an es module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = resolve(
	__dirname,
	`../test-results/visual-regression-results.json`,
);
const fileContent = JSON.parse(readFileSync(filePath, 'utf-8'));

const tests = fileContent.suites;

let resultsTable = `| Template | Visual test status |
| ------------- | ------------- |`;

for (const test of tests) {
	const testStatus = Boolean(test.suites[0].specs[1].ok);
	const testTitle = test.suites[0].title;
	resultsTable += `\n| ${testTitle} | ${testStatus ? '✅' : '❌'} |`;
}

writeFileSync(
	resolve(__dirname, `../test-results/visual-regression-results-table.txt`),
	resultsTable,
);
