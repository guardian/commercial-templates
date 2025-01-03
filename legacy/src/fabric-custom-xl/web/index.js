//@flow
import { getIframeId, resizeIframeHeight, getWebfonts } from '../../_shared/js/messages';
import { write } from '../../_shared/js/dom';

const DapAssetsRoot = `https://s3-eu-west-1.amazonaws.com/adops-assets/dap-fabrics`;
const DapAssetsFolder = '[%DapAssetsFolder%]';

const DapAssetsPath = `${DapAssetsRoot}/${DapAssetsFolder}`;

const ifThenPromise = (parameter, action) => {
  if (parameter === 'true') {
    return action();
  } else {
    return Promise.resolve();
  }
}

const fetchTag = (tagUrl) => {
  return fetch(tagUrl)
    .then(response => response.text())
}

const replaceAssetLinks = (html) => {
  const re = /url\('\.\/(.*)'\)/g;
  return html.replace(re, `url('${DapAssetsPath}/$1')`);
}

const generateTag = () => {
  if (DapAssetsFolder) {
    return fetchTag(`${DapAssetsPath}/index.html`)
      .then(replaceAssetLinks)
  } 
  return Promise.reject('No tag found');
};

const insertTag = (tag) => {
  const placeholder = document.getElementById('js-fabric-custom');
  const range = document.createRange();
  range.setStart(placeholder, 0);
  range.setEnd(placeholder, 0);
  placeholder.appendChild(range.createContextualFragment(tag));
};

getIframeId()
.then(() => getWebfonts())
.then(() => generateTag())
.then(tag => insertTag(tag))
.then(() => resizeIframeHeight(524));//to take into acoount the ad slot label
