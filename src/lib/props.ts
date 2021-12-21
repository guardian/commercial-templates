export type GAMVar<T extends string> = `[%${Capitalize<T>}%]`;

const capitalise = <T extends string>(s: T): Capitalize<T> =>
	`${s.charAt(0).toUpperCase()}${s.slice(1)}` as Capitalize<T>;

export const gamVar = <T extends string>(s: T): GAMVar<T> =>
	`[%${capitalise(s)}%]`;
