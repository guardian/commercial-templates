import fs from 'fs';
import compiler from 'svelte/compiler';

type Props = Record<string, `[%${string}%]`>;

const getProps = (path: string): Props => {
	console.log(process.cwd(), path);

	const { vars } = compiler.compile(
		// TODO: handle Typescript, too
		fs.readFileSync(path, 'utf8'),
		{},
	);

	const props: Props = vars
		.filter((v) => v.writable)
		.map((v) => v.name)
		.reduce((o, key) => {
			o[key] = `[%${key}%]`;
			return o;
		}, {});

	return props;
};

export { getProps };
