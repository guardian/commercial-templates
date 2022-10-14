const transformImportDeclarations = require('./transform-import-declarations.cjs');
const transformImportedFunctions = require('./transform-imported-functions.cjs');
const registerCustomMethods = require('../register-custom-methods.cjs');

module.exports = function (fileInfo, api, options) {
	const fixes = [transformImportDeclarations, transformImportedFunctions];
	let src = fileInfo.source;

	registerCustomMethods(api.jscodeshift);
	fixes.forEach((fix) => {
		if (typeof src === 'undefined') {
			return;
		}
		const nextSrc = fix({ ...fileInfo, source: src }, api, options);

		if (nextSrc) {
			src = nextSrc;
		}
	});

	return src;
};

module.exports.parser = 'ts';
