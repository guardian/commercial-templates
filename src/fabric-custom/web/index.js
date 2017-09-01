//@flow
import { getIframeId, resizeIframeHeight, getWebfonts, showAdvertLabel } from '../../_shared/js/messages';
import { write } from '../../_shared/js/dom';

const DapAssetsRoot = `https://s3-eu-west-1.amazonaws.com/adops-assets/dap-fabrics`;
const DapAssetsFolder = '[%DapAssetsFolder%]';

const DapAssetsPath = `${DapAssetsRoot}/${DapAssetsFolder}`;
const ThirdPartyTag = '[%ThirdPartyTag%]';

const ifThenPromise = (parameter, action) => {
  if (parameter === 'true') {
    return action();
  } else {
    return Promise.resolve();
  }
}

const fetchTag = (tagUrl: string) => {
  return fetch(tagUrl)
    .then(response => response.text())
}

const replaceAssetLinks = (html: string) => {
  const re = /url\('\.\/(.*)'\)/g;
  return html.replace(re, `url('${DapAssetsPath}/$1')`);
}

const generateTag = () => {
  if (DapAssetsFolder) {
    return fetchTag(`${DapAssetsPath}/index.html`)
      .then(replaceAssetLinks)
  } else if (ThirdPartyTag) {
      return fetchTag(`[%ThirdPartyTag%]`)
  }
};

const insertTag = (tag) => {
  const placeholder = document.getElementById('js-fabric-custom');
  const range = document.createRange();
  range.setStart(placeholder, 0);
  range.setEnd(placeholder, 0);
  placeholder.appendChild(range.createContextualFragment(tag));
};

const addAdvertLabel = () => {
  const label = `<div class="ad-slot__label">Advertisement</div>`;
  write( () => document.body.insertAdjacentHTML('afterbegin', label));
}

const shouldShowLabel = '[%ShowLabel%]' === 'true';

getIframeId()
.then(() => shouldShowLabel ? addAdvertLabel() : Promise.resolve())
.then(() => getWebfonts())
.then(() => generateTag())
.then(tag => insertTag(tag))
.then(() => resizeIframeHeight());
