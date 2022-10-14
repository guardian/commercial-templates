module.exports = function (fileInfo, api, options) {
	return api
		.jscodeshift(fileInfo.source)
		.replaceImportSource('../../_shared/js/messages.js', '$lib/messenger')
		.replaceImportName('$lib/messenger', 'sendMessage', 'post')
		.toSource();
};
