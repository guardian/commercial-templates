import minimist from 'minimist';
import { promises, existsSync } from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

const argv = minimist(process.argv.slice(2));
const { writeFile, readFile, rm, copyFile } = promises;
const populateSvelteTemplate = ({ html, scss }) => `
<!-- https://polyfill.io/v3/polyfill.min.js?features=default -->
<script lang="ts">
</script>

${html}

<style lang="scss">
${scss}
</style>
`;
const migrationTips = `
/**
 * commercial-templates Svelte migration tips
 * ==============
 *
 * Congratulations on choosing to migrate this template to Svelte! Some of the
 * patterns used in the legacy template have been deprecated or simplified. Here
 * are some tips to help you migrate.
 *
 * Please delete this comment when you have finished migrating this file.
 *
 * * \`getIframeId\` can be removed
 * * messages such as \`sendMessage\` can be replaced by calls to \`post\`
 */
`;

void (async () => {
	const templateName = argv._[0];

	if (!templateName) {
		console.log(`Please pass a template name to the migrate script
usage: yarn migrate glabs-bative-traffic-driver`);
		process.exit(-1);
	}
	if (!existsSync(path.resolve('legacy', 'src', templateName))) {
		console.log(
			`Template "${templateName}" not found. Please ensure legacy/src/${templateName}/ exists and try again`,
		);
		process.exit(-1);
	}

	// read legacy stuff
	const legacyDir = path.resolve('legacy', 'src', templateName);
	const legacyTestJsonFile = path.resolve(legacyDir, 'test.json');
	const legacyHtmlFile = path.resolve(legacyDir, 'web', 'index.html');
	const legacyScssFile = path.resolve(legacyDir, 'web', 'index.scss');
	const legacyJsFile = path.resolve(legacyDir, 'web', 'index.js');
	const html = await readFile(legacyHtmlFile, 'utf8');
	const scss = await readFile(legacyScssFile, 'utf8');
	const js = await readFile(legacyJsFile, 'utf8');

	// write new stuff
	const newDir = path.resolve('src', 'templates', 'ssr', templateName);
	try {
		await rm(newDir, { recursive: true });
	} catch (e) {}
	await mkdirp(newDir);
	await copyFile(legacyTestJsonFile, path.resolve(newDir, 'test.json'));
	await writeFile(path.resolve(newDir, 'index.ts'), `${migrationTips}${js}`);
	await writeFile(
		path.resolve(newDir, 'index.svelte'),
		populateSvelteTemplate({ html, scss }),
	);
})();
