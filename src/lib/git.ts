import fs from 'fs';
import type { ReadCommitResult } from 'isomorphic-git';
import { log } from 'isomorphic-git';

const getCommit = async (
	filepath: string,
): Promise<ReadCommitResult | undefined> => {
	const dir = process.cwd();

	const [commit] = await log({
		fs,
		dir,
		ref: 'HEAD',
		filepath,
		force: true,
	});

	return commit;
};

export { getCommit };
