const Promise = require('bluebird');
const fsExtra = require('fs-extra');

const fs = Promise.promisifyAll(fsExtra);
const buildPath = './build/';
const srcPath = './src/';

let filePaths = {};
let builtHTML;

function buildHTML() {
	builtHTML += '<style> body { margin: 0 } ' + filePaths.CSS.contents + '</style>' + filePaths.HTML.contents;
} 

function getFileContents(filePath) {
	return fs.readFileAsync(filePaths[filePath].path, 'utf8').then(contents => {
		filePaths[filePath].contents = contents;
	});
}

function replacePlaceholders() {
	const placeholders = builtHTML.match(/\[%(.*?)\%]/g);

	placeholders.map(function (placeholder) {
		replacePlaceholder(placeholder);
	});
}

function replacePlaceholder(placeholder) {
	const templateJSON = JSON.parse(filePaths.JSON.contents);
	const key = placeholder.slice(2, -2);

	if (templateJSON[key]) {
		while (builtHTML.indexOf(placeholder) !== -1) {
			builtHTML = builtHTML.replace(placeholder, templateJSON[key]);
		}
	}
}

function getHTML(id) {
	filePaths = {
		HTML: {
			path: buildPath + id + '/index.html'
		},
		CSS: {
			path: buildPath + id + '/index.css'
		},
		JSON: {
			path: srcPath + id + '/test.json'
		}
	};

	builtHTML = '';

	return new Promise((resolve, reject) => {
		Promise.all(Object.keys(filePaths).map(getFileContents))
		.then(() => buildHTML())
		.then(() => replacePlaceholders())
		.then(() => {
			resolve(builtHTML);
		})
		.catch((err) => {
			reject(new Error('sorry there was an error'));
		});
    });
}

module.exports = getHTML;