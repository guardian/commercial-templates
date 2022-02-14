import { gamVar, GAMVariable } from '$lib/gam';
import { readFileSync } from 'fs';

/**
 * Used for automatic prop extraction in templates
 */
type Props = Record<string, GAMVariable>;

const REGEX = {
	script: /<script[\s\S]*?>[\s\S]+?<\/script>/g,
	props: /export let (.+?): GAMVariable;/g,
};

const getProps = (path: string): Props => {
	const content = readFileSync(path, 'utf8');

	const script = content
		.match(REGEX.script)
		?.filter((script) => !script.includes('context="module"'))[0];

	if (!script) return {};

	const props = [...script.matchAll(REGEX.props)]
		.map((matches) => matches[1])
		.reduce<Props>((props, prop) => {
			if (prop) props[prop] = gamVar(prop);
			return props;
		}, {});

	return props;
};

export { getProps };
export type { Props };
