import fs from 'fs';
import type { ReadCommitResult } from 'isomorphic-git';
import { log } from 'isomorphic-git';

/**
 * Get the commit message for a specific file.
 *
 * @param filepath the file to look up.
 * @param ref the git reference. Defaults to "HEAD".
 * @returns {Promise<ReadCommitResult | undefined>} Either an object with commit data or `undefined` if the file isn’t in git.
 */
const getCommit = async (
	filepath: string,
	ref = 'HEAD',
): Promise<ReadCommitResult | undefined> => {
	const dir = process.cwd();

	const [commit] = await log({
		fs,
		dir,
		ref,
		filepath,
		force: true,
	});

	return commit;
};

export { getCommit };
