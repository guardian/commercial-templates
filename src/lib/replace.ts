const replaceGAMVariables = (input: string, variables: Record<string, string>): string => {
	const output = Object.entries(variables).reduce((replaced, [key, value]) => {
		return (
			replaced
				// Variables in the form [%myOneVariable%]
				.replaceAll(`[%${key}%]`, value)
				// Variables in the form %%MY_OTHER_VARIABLE%%
				.replaceAll(`%%${key}%%`, value)
		);
	}, input);

	return output;
};

export { replaceGAMVariables };
