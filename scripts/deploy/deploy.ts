import { config as loadEnv } from 'dotenv';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import {
	AdManagerClient,
	GoogleSACredential,
	NativeStyleService,
	StatementBuilder,
} from '@guardian/google-admanager-api';

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

type TemplateInfo = {
	nativeStyleId?: number;
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

	if (templateInfo.nativeStyleId === undefined) {
		console.error(
			`[!] ERROR: Template "${dirName}" ad.json is missing required field "nativeStyleId"`,
		);
		return false;
	}

	if (
		typeof templateInfo.nativeStyleId !== 'number' ||
		!Number.isFinite(templateInfo.nativeStyleId)
	) {
		console.error(
			`[!] ERROR: Template "${dirName}" ad.json has invalid "nativeStyleId" (must be a number)`,
		);
		return false;
	}

	if (templateInfo.nativeStyleId <= 0) {
		console.error(
			`[!] ERROR: Template "${dirName}" ad.json has empty "nativeStyleId"`,
		);
		return false;
	}

	const statement = new StatementBuilder()
		.where('id = :id')
		.addValue('id', templateInfo.nativeStyleId)
		.toStatement();

	try {
		const response = await nativeStyleService.getNativeStylesByStatement(statement);
		if (response.results?.length) {
			const style = response.results[0];
			console.log(
				`[OK] Native style "${style.name}" with ID "${style.id}" was found for template "${dirName}".`,
			);

			const updatedStyle = {
				...style,
				htmlSnippet: htmlPrefix + html,
				cssSnippet: cssPrefix + css,
			};

			console.log(`[i] Updating native style "${style.name}".`);
			await nativeStyleService.updateNativeStyles([updatedStyle]);
			console.log(`[OK] Native style "${style.name}" was updated.`);
			return true;
		}

		console.error(
			`[!] ERROR: No native styles found to update for "${dirName}" with nativeStyleId "${templateInfo.nativeStyleId}". Please check the nativeStyleId in ad.json.`,
		);
		return false;
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(`[!] Error updating native style: ${message}`);
		return false;
	}
};

const main = async (nativeStyleService: NativeStyleService): Promise<void> => {
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
		);
		if (result) {
			successfulTemplates.push(dirName.name);
		} else {
			failedTemplates.push(dirName.name);
		}
	}

	if (successfulTemplates.length > 0) {
		console.log(
			`\n[OK] Successfully deployed ${successfulTemplates.length} template(s):`,
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
		console.error('[!] - Invalid ad.json format or missing nativeStyleId');
		console.error("[!] - Invalid nativeStyleId that doesn't exist in GAM");
		console.error('[!] Please fix these issues before merging.');
		process.exit(1);
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
await main(nativeStyleService);
