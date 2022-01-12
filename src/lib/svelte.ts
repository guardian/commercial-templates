import { gamVar } from '$lib/gam';
import { readFileSync } from 'fs';

/**
 * Used for automatic prop extraction in templates
 */
type Prop = `[%${string}%]`;
type Props = Record<string, Prop>;

const REGEX = {
	script: /<script[\s\S]*?>[\s\S]+?<\/script>/g,
	props: /export let (.+?): Prop;/g,
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
			props[prop] = gamVar(prop);
			return props;
		}, {});

	return props;
};

export { getProps };
export type { Props, Prop };
