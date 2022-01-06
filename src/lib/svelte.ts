import { gamVar } from '$lib/gam';
import { readFileSync } from 'fs';
import { compile } from 'svelte/compiler';

type Props = Record<string, `[%${string}%]`>;

const getProps = (path: string): Props => {
	const { vars } = compile(
		// TODO: handle Typescript, too
		readFileSync(path, 'utf8'),
		{},
	);

	const props: Props = vars
		.filter((v) => v.writable)
		.map((v) => v.name)
		.reduce((o, key) => {
			o[key] = gamVar(key);
			return o;
		}, {});

	return props;
};

export { getProps };
