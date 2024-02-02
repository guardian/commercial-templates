import { post } from '$lib/messenger';

const DapAssetsRoot = `https://s3-eu-west-1.amazonaws.com/adops-assets/dap-fabrics`;
const DapAssetsFolder: string = '[%DapAssetsFolder%]';

const DapAssetsPath = `${DapAssetsRoot}/${DapAssetsFolder}`;
const ThirdPartyTag: string = '[%ThirdPartyTag%]';

// relative paths in the CSS need to be replaced with the absolute path
const replaceAssetLinks = (html: string) => {
	const re = /url\('\.\/(.*)'\)/g;
	return html.replace(re, `url('${DapAssetsPath}/$1')`);
};

const getTag = () => {
	if (DapAssetsFolder) {
		return fetch(`${DapAssetsPath}/index.html`)
			.then((res) => res.text())
			.then(replaceAssetLinks);
	} else if (ThirdPartyTag) {
		return fetch(ThirdPartyTag).then((res) => res.text());
	}
	return Promise.reject('No tag found');
};

getTag()
	.then((tag) => {
		document.getElementById('creative-link')!.innerHTML = tag;
		post({
			type: 'resize',
			value: { height: document.getElementById('creative')!.offsetHeight },
		});
	})
	.catch((e) => {
		console.error(e);
	});
