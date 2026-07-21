import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
	NativeStyleService} from '@guardian/google-admanager-api';
import {
	AdManagerClient,
	GoogleSACredential,
	StatementBuilder,
} from '@guardian/google-admanager-api';
import { config as loadEnv } from 'dotenv';

loadEnv();

const GAM_API_VERSION = 'v202602';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templateDir = resolve(__dirname, '../../build/extracted-templates');

const applicationName = process.env.GAM_APPLICATION_NAME;
const networkCodeRaw = process.env.GAM_NETWORK_CODE;
const serviceAccountKeyRaw = process.env.SERVICE_ACCOUNT_KEY_FILE;

const dateLabel = new Date().toLocaleDateString('en-US');
const htmlPrefix = `<!-- DO NOT EDIT -- FILE GENERATED AND DEPLOYED AUTOMATICALLY FROM https://github.com/guardian/commercial-templates ON ${dateLabel} -->`;
const cssPrefix = `/* DO NOT EDIT -- FILE GENERATED AND DEPLOYED AUTOMATICALLY FROM https://github.com/guardian/commercial-templates ON ${dateLabel} */`;
const dryRun = process.argv.includes('--dry-run');

if (dryRun) {
	console.log(
		'[i] Running in dry-run mode: templates and GAM IDs will be validated, but styles will not be updated.',
	);
}

type TemplateInfo = {
	testNativeStyleId?: unknown;
};

const parsePositiveInteger = (value: unknown): number | null => {
	if (typeof value === 'number') {
		if (Number.isInteger(value) && value > 0) {
			return value;
		}
		return null;
	}

	return null;
};

const fail = (message: string): never => {
	console.error(message);
	process.exit(1);
};

const requiredEnv = (name: string): string => {
	const value = process.env[name];
	if (!value) {
		fail(`[!] ${name} is not set in .env`);
		throw new Error('unreachable');
	}
	return value;
};

const uploadTemplate = async (
	nativeStyleService: NativeStyleService,
	root: string,
	dirName: string,
	dryRunMode: boolean,
): Promise<boolean> => {
	const requiredFiles = ['ad.json', 'index.html', 'style.css'];
	const missingFiles = requiredFiles.filter(
		(fileName) => !existsSync(resolve(root, dirName, fileName)),
	);

	if (missingFiles.length > 0) {
		console.error(
			`[!] ERROR: Template "${dirName}" is missing required files: ${missingFiles.join(', ')}. All templates must have ad.json, index.html, and style.css for automatic deployment to GAM.`,
		);
		return false;
	}

	let infoJson = '';
	let html = '';
	let css = '';

	try {
		infoJson = readFileSync(resolve(root, dirName, 'ad.json'), 'utf8');
		html = readFileSync(resolve(root, dirName, 'index.html'), 'utf8');
		css = readFileSync(resolve(root, dirName, 'style.css'), 'utf8');
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(
			`[!] ERROR: Failed to read files for template "${dirName}": ${message}`,
		);
		return false;
	}

	let templateInfo: TemplateInfo;
	try {
		templateInfo = JSON.parse(infoJson) as TemplateInfo;
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(
			`[!] ERROR: Invalid JSON in ad.json for template "${dirName}": ${message}`,
		);
		return false;
	}

	if (templateInfo.testNativeStyleId === undefined) {
		console.error(
			`[!] ERROR: Template "${dirName}" ad.json is missing required field "testNativeStyleId"`,
		);
		return false;
	}

	const parsedNativeStyleId = parsePositiveInteger(templateInfo.testNativeStyleId);
	if (parsedNativeStyleId === null) {
		console.error(
			`[!] ERROR: Template "${dirName}" ad.json has invalid "testNativeStyleId" (must be a positive integer)`,
		);
		return false;
	}

	const statement = new StatementBuilder()
		.where('id = :id')
		.addValue('id', parsedNativeStyleId)
		.toStatement();

	try {
		const response = await nativeStyleService.getNativeStylesByStatement(statement);
		if (response.results.length) {
			const style = response.results[0];
			if (!style) {
				console.error(
					`[!] ERROR: No native style found for template "${dirName}" with testNativeStyleId "${parsedNativeStyleId}". Please check testNativeStyleId in ad.json.`,
				);
				return false;
			}
			console.log(
				`[OK] Native style "${style.name}" with ID "${style.id}" was found for template "${dirName}".`,
			);

			const updatedStyle = {
				...style,
				htmlSnippet: htmlPrefix + html,
				cssSnippet: cssPrefix + css,
			};

			if (dryRunMode) {
				console.log(
					`[DRY RUN] Would update native style "${style.name}" (ID "${style.id}") for template "${dirName}".`,
				);
				return true;
			}

			console.log(`[i] Updating native style "${style.name}".`);
			await nativeStyleService.updateNativeStyles([updatedStyle]);
			console.log(`[OK] Native style "${style.name}" was updated.`);
			return true;
		}

		console.error(
			`[!] ERROR: No native styles found to update for "${dirName}" with testNativeStyleId "${parsedNativeStyleId}". Please check testNativeStyleId in ad.json.`,
		);
		return false;
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(`[!] Error updating native style: ${message}`);
		return false;
	}
};

const main = async (
	nativeStyleService: NativeStyleService,
	dryRunMode: boolean,
): Promise<void> => {

	if (!existsSync(templateDir)) {
		fail(
			`[!] ERROR: Template directory "${templateDir}" does not exist. Please run the build process first.`,
		);
	}

	if (readdirSync(templateDir).length === 0) {
		fail(
			`[!] ERROR: Template directory "${templateDir}" is empty. Please run the build process first.`,
		);
	}

	const failedTemplates: string[] = [];
	const successfulTemplates: string[] = [];

	for (const dirName of readdirSync(templateDir, { withFileTypes: true })) {
		if (!dirName.isDirectory()) {
			continue;
		}

		const result = await uploadTemplate(
			nativeStyleService,
			templateDir,
			dirName.name,
			dryRunMode,
		);
		if (result) {
			successfulTemplates.push(dirName.name);
		} else {
			failedTemplates.push(dirName.name);
		}
	}

	if (successfulTemplates.length > 0) {
		const action = dryRunMode ? 'validated' : 'deployed';
		console.log(
			`\n[OK] Successfully ${action} ${successfulTemplates.length} template(s):`,
		);
		for (const template of successfulTemplates) {
			console.log(`  - ${template}`);
		}
	}

	if (failedTemplates.length > 0) {
		console.error(`\n[!] Failed to deploy ${failedTemplates.length} template(s):`);
		for (const template of failedTemplates) {
			console.error(`  - ${template}`);
		}
		console.error('\n[!] DEPLOYMENT FAILED: Common causes:');
		console.error('[!] - Missing required files (ad.json, index.html, style.css)');
		console.error('[!] - Invalid ad.json format or missing testNativeStyleId');
		console.error("[!] - Invalid testNativeStyleId that doesn't exist in GAM");
		console.error('[!] Please fix these issues before merging.');
		process.exit(1);
	}

	if (dryRunMode) {
		console.log('\n[OK] Dry run completed: all templates validated successfully.');
		return;
	}

	console.log('\n[OK] All templates deployed successfully!');
};

const validatedServiceAccountKeyRaw =
	serviceAccountKeyRaw ?? requiredEnv('SERVICE_ACCOUNT_KEY_FILE');
const validatedApplicationName =
	applicationName ?? requiredEnv('GAM_APPLICATION_NAME');
const validatedNetworkCodeRaw = networkCodeRaw ?? requiredEnv('GAM_NETWORK_CODE');

const networkCode = Number(validatedNetworkCodeRaw);
if (!Number.isInteger(networkCode) || networkCode <= 0) {
	fail('[!] GAM_NETWORK_CODE must be a positive integer');
}

const credential = (() => {
	try {
		const serviceAccountJson = JSON.parse(validatedServiceAccountKeyRaw) as Record<
			string,
			unknown
		>;
		return new GoogleSACredential(serviceAccountJson);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		fail(
			`[!] SERVICE_ACCOUNT_KEY_FILE must be valid service-account JSON: ${message}`,
		);
		throw new Error('unreachable');
	}
})();

const adManagerClient = new AdManagerClient(
	networkCode,
	credential,
	validatedApplicationName,
	GAM_API_VERSION,
);

const nativeStyleService = await adManagerClient.getService('NativeStyleService');
await main(nativeStyleService, dryRun);
