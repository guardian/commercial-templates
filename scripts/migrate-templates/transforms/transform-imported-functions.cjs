module.exports = function (fileInfo, api, options) {
	return api
		.jscodeshift(fileInfo.source)
		.replaceCalledFunctionName('sendMessage', 'post')
		.toSource();
};
