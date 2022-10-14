module.exports = (jscodeshift) => {
	jscodeshift.registerMethods({
		replaceImportSource: function (oldSource, newSource) {
			return this.find(jscodeshift.ImportDeclaration).forEach(function (path) {
				if (path.value.source.value === oldSource) {
					path.get('source').replace(`'${newSource}'`);
				}
			});
		},
		replaceImportName: function (source, oldName, newName) {
			return this.find(jscodeshift.ImportSpecifier).forEach(function (path) {
				if (path.parent.get('source').value === `'${source}'`) {
					if (path.get('local').get('name').value === oldName) {
						path.get('local').get('name').replace(newName);
					}
				}
			});
		},
		replaceCalledFunctionName: function (oldName, newName) {
			return this.find(jscodeshift.CallExpression).forEach(function (path) {
				if (path.get('callee').get('name').value === oldName) {
					path.get('callee').get('name').replace(newName);
					// console.log(path.get('arguments').value[0].value);
				}
			});
		},
	});
};
