import { readdir, readFile } from 'fs/promises';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const dirs = await readdir('src/routes/templates');
	const templateNames = dirs.filter((dir) => !dir.startsWith('+'));

	const templateIds = await Promise.all(
		templateNames.map(async (name) => {
			const adJson = `src/routes/templates/${name}/ad.json`;
			try {
				const adFile = await readFile(adJson, 'utf-8').then(
					(data: string) => JSON.parse(data) as { nativeStyleId: string },
				);
				return adFile.nativeStyleId;
			} catch {
				return null;
			}
		}),
	);

	const templates = templateNames.map((name, index) => ({
		name,
		id: templateIds[index],
	}));

	return {
		templates,
	};
};
