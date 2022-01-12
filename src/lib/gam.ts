export type GAMVar<T extends string> = `[%${Capitalize<T>}%]`;

const capitalise = <T extends string>(s: T): Capitalize<T> =>
	`${s.charAt(0).toUpperCase()}${s.slice(1)}` as Capitalize<T>;

export const gamVar = <T extends string>(s: T): GAMVar<T> =>
	`[%${capitalise(s)}%]`;

const formatProps = <T extends string, P extends Record<T, string>>(
	props: P,
): Record<Capitalize<T>, string> =>
	Object.entries(props).reduce((clean, [key, value]) => {
		clean[capitalise(key)] = value;
		return clean;
	}, {} as Record<Capitalize<T>, string>);

const replaceGAMVariables = (
	input: string,
	variables: Record<string, string>,
): string => {
	const output = Object.entries(variables).reduce(
		(replaced, [key, value]) => {
			return (
				replaced
					// Variables in the form [%MyOneVariable%]
					.replaceAll(gamVar(key), value)
					// Variables in the form %%MY_OTHER_VARIABLE%%
					.replaceAll(`%%${key}%%`, value)
			);
		},
		input,
	);

	return output;
};

export { replaceGAMVariables, formatProps };