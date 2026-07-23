import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { inspect } from 'node:util';
import type {
	NativeStyleService} from '@guardian/google-admanager-api';
import {
	AdManagerClient,
	GoogleSACredential,
	StatementBuilder,
} from '@guardian/google-admanager-api';
import { config as loadEnv } from 'dotenv';

const GAM_API_VERSION = 'v202602';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, '.env');

loadEnv({ path: envPath });

const templateDir = resolve(__dirname, '../../build/extracted-templates');

const applicationName = process.env.GAM_APPLICATION_NAME;
const networkCodeRaw = process.env.GAM_NETWORK_CODE;
const serviceAccountKeyRaw = process.env.SERVICE_ACCOUNT_KEY_FILE;

const dateLabel = new Date().toLocaleDateString('en-US');
const htmlPrefix = `<!-- DO NOT EDIT -- FILE GENERATED AND DEPLOYED AUTOMATICALLY FROM https://github.com/guardian/commercial-templates ON ${dateLabel} -->`;
const cssPrefix = `/* DO NOT EDIT -- FILE GENERATED AND DEPLOYED AUTOMATICALLY FROM https://github.com/guardian/commercial-templates ON ${dateLabel} */`;
const dryRun = process.argv.includes('--dry-run');
const ciMode = process.argv.includes('--ci');
const useProductionStyleIds = process.argv.includes('--production');
const nativeStyleIdField = useProductionStyleIds
	? 'nativeStyleId'
	: 'testNativeStyleId';
const deploymentTargetLabel = useProductionStyleIds
	? 'production native styles'
	: 'test native styles';

if (dryRun) {
	console.log(
		`[i] Running in dry-run mode for ${deploymentTargetLabel}: templates and GAM IDs will be validated, but styles will not be updated.`,
	);
}

if (useProductionStyleIds) {
	console.log(
		'[i] Production ID mode enabled: using "nativeStyleId" values from ad.json.',
	);
}

type TemplateInfo = {
	nativeStyleId?: number;
	testNativeStyleId?: number;
};

const parsePositiveInteger = (value: unknown): number | null => {
	if (typeof value === 'number') {
		if (Number.isInteger(value) && value > 0) {
			return value;
		}
		return null;
	}

	if (typeof value === 'string') {
		const trimmed = value.trim();
		if (/^\d+$/.test(trimmed)) {
			const parsed = Number(trimmed);
			if (Number.isInteger(parsed) && parsed > 0) {
				return parsed;
			}
		}
		return null;
	}

	return null;
};

const fail = (message: string): never => {
	console.error(message);
	process.exit(1);
};

const formatUnknownError = (error: unknown): string => {
	if (error instanceof Error) {
		return error.stack ?? error.message;
	}

	if (typeof error === 'object' && error !== null) {
		return inspect(error, { depth: 6, breakLength: 120, compact: false });
	}

	return String(error);
};

const requiredEnv = (name: string): string => {
	const value = process.env[name];
	if (!value) {
		fail(`[!] ${name} is not set (expected as an environment variable or in scripts/deploy/.env)`);
		throw new Error('unreachable');
	}
	return value;
};

const getConfiguredNativeStyleId = (
	templateInfo: TemplateInfo,
	templateName: string,
): number | null => {
	const configuredStyleId = templateInfo[nativeStyleIdField];

	if (configuredStyleId === undefined) {
		console.error(
			`[!] ERROR: Template "${templateName}" ad.json is missing required field "${nativeStyleIdField}"`,
		);
		return null;
	}

	const parsedNativeStyleId = parsePositiveInteger(configuredStyleId);
	if (parsedNativeStyleId === null) {
		console.error(
			`[!] ERROR: Template "${templateName}" ad.json has invalid "${nativeStyleIdField}" (must be a positive integer)`,
		);
		return null;
	}

	return parsedNativeStyleId;
};

const resolveStylePreview = async (
	nativeStyleService: NativeStyleService,
	root: string,
	templateName: string,
): Promise<{ templateName: string; styleId: number; styleName: string }> => {
	const infoJson = readFileSync(resolve(root, templateName, 'ad.json'), 'utf8');
	const templateInfo = JSON.parse(infoJson) as TemplateInfo;
	const parsedNativeStyleId = getConfiguredNativeStyleId(
		templateInfo,
		templateName,
	);

	if (parsedNativeStyleId === null) {
		throw new Error(
			`Template "${templateName}" has invalid or missing ${nativeStyleIdField}. See error above.`,
		);
	}

	const statement = new StatementBuilder()
		.where('id = :id')
		.addValue('id', parsedNativeStyleId)
		.toStatement();
	const response = await nativeStyleService.getNativeStylesByStatement(statement);
	const style = (response.results ?? [])[0];

	if (!style) {
		throw new Error(
			`No native style found for template "${templateName}" with ${nativeStyleIdField} "${parsedNativeStyleId}".`,
		);
	}

	return { templateName, styleId: style.id, styleName: style.name };
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
		const message = formatUnknownError(error);
		console.error(
			`[!] ERROR: Failed to read files for template "${dirName}": ${message}`,
		);
		return false;
	}

	let templateInfo: TemplateInfo;
	try {
		templateInfo = JSON.parse(infoJson) as TemplateInfo;
	} catch (error) {
		const message = formatUnknownError(error);
		console.error(
			`[!] ERROR: Invalid JSON in ad.json for template "${dirName}": ${message}`,
		);
		return false;
	}

	const parsedNativeStyleId = getConfiguredNativeStyleId(templateInfo, dirName);
	if (parsedNativeStyleId === null) {
		return false;
	}

	const statement = new StatementBuilder()
		.where('id = :id')
		.addValue('id', parsedNativeStyleId)
		.toStatement();

	try {
		const response = await nativeStyleService.getNativeStylesByStatement(statement);
		const results = response.results ?? [];
		if (results.length) {
			const style = results[0];
			if (!style) {
				console.error(
					`[!] ERROR: No native style found for template "${dirName}" with ${nativeStyleIdField} "${parsedNativeStyleId}". Please check ${nativeStyleIdField} in ad.json.`,
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
			try {
				await nativeStyleService.updateNativeStyles([updatedStyle]);
			} catch (error) {
				const message = formatUnknownError(error);
				console.error(
					`[!] ERROR: GAM updateNativeStyles failed for template "${dirName}" with style ID "${style.id}": ${message}`,
				);
				return false;
			}
			console.log(`[OK] Native style "${style.name}" was updated.`);
			return true;
		}

		console.error(
			`[!] ERROR: No native styles found to update for "${dirName}" with ${nativeStyleIdField} "${parsedNativeStyleId}". Please check ${nativeStyleIdField} in ad.json.`,
		);
		return false;
	} catch (error) {
		const message = formatUnknownError(error);
		console.error(
			`[!] ERROR: GAM getNativeStylesByStatement failed for template "${dirName}" with ${nativeStyleIdField} "${parsedNativeStyleId}": ${message}`,
		);
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

	const templateNames = readdirSync(templateDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);

	console.log(
		`[i] Resolving GAM style names for ${templateNames.length} template(s) before ${dryRunMode ? 'validation' : 'deployment'} to ${deploymentTargetLabel}...`,
	);

	const previewRows: Array<{ templateName: string; styleId: number; styleName: string }> = [];
	for (const templateName of templateNames) {
		try {
			const preview = await resolveStylePreview(
				nativeStyleService,
				templateDir,
				templateName,
			);
			previewRows.push(preview);
		} catch (error) {
			fail(
				`[!] ERROR: Failed to resolve GAM style preview for template "${templateName}" using ${nativeStyleIdField}: ${formatUnknownError(error)}`,
			);
		}
	}

	for (const row of previewRows) {
		console.log(`  - ${row.templateName} -> "${row.styleName}" (ID ${row.styleId})`);
	}

	if (!ciMode) {
		if (!process.stdin.isTTY || !process.stdout.isTTY) {
			fail(
				'[!] Interactive confirmation requires an interactive terminal. Re-run with --ci to skip confirmation.',
			);
		}

		const rl = createInterface({ input: process.stdin, output: process.stdout });
		const answer = (
			await rl.question(
				`\nProceed with ${dryRunMode ? 'this dry run' : 'deployment'} to ${deploymentTargetLabel}? [y/N]: `,
			)
		)
			.trim()
			.toLowerCase();

		if (answer !== 'y' && answer !== 'yes') {
			rl.close();
			console.log('[i] Aborted by user. No templates were changed.');
			process.exit(0);
		}

		if (useProductionStyleIds && !dryRunMode) {
			const prodConfirm = (
				await rl.question(
					'\n⚠️  You are about to deploy to PRODUCTION. Type "production" to confirm: ',
				)
			).trim();

			if (prodConfirm !== 'production') {
				rl.close();
				console.log('[i] Aborted by user. Production confirmation failed.');
				process.exit(0);
			}
		}

		rl.close();
	}

	const failedTemplates: string[] = [];
	const successfulTemplates: string[] = [];

	for (const templateName of templateNames) {
		const result = await uploadTemplate(
			nativeStyleService,
			templateDir,
			templateName,
			dryRunMode,
		);
		if (result) {
			successfulTemplates.push(templateName);
		} else {
			failedTemplates.push(templateName);
		}
	}

	if (successfulTemplates.length > 0) {
		const action = dryRunMode ? 'validated' : 'deployed';
		console.log(
			`\n[OK] Successfully ${action} ${successfulTemplates.length} template(s) to ${deploymentTargetLabel}:`,
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
		console.error(
			`[!] - Invalid ad.json format or missing ${nativeStyleIdField}`,
		);
		console.error(
			`[!] - Invalid ${nativeStyleIdField} that doesn't exist in GAM`,
		);
		console.error('[!] Please fix these issues before merging.');
		process.exit(1);
	}

	if (dryRunMode) {
		console.log(
			`\n[OK] Dry run completed: all templates validated successfully against ${deploymentTargetLabel}.`,
		);
		return;
	}

	console.log(
		`\n[OK] All templates deployed successfully to ${deploymentTargetLabel}!`,
	);
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
		const message = formatUnknownError(error);
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

const nativeStyleService = await adManagerClient
	.getService('NativeStyleService')
	.catch((error: unknown) => {
		fail(
			`[!] ERROR: Failed to initialize NativeStyleService for network "${networkCode}": ${formatUnknownError(error)}`,
		);
		throw new Error('unreachable');
	});
await main(nativeStyleService, dryRun);
