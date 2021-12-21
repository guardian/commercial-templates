import { gamVar } from '$lib/props';
import { readFileSync } from 'fs';
import { compile } from 'svelte/compiler';

type Props = Record<string, `[%${string}%]`>;

const getProps = (path: string): Props => {
	console.log(process.cwd(), path);

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
