//@flow
import { getIframeId, resizeIframeHeight, getWebfonts } from '../../_shared/js/messages';
import { write } from '../../_shared/js/dom';

const ifThenPromise = (parameter, action) => {
  if (parameter === 'true') {
    return action();
  } else {
    return Promise.resolve();
  }
}

const fetchTag = (tagUrl: string) => {
  return fetch(tagUrl)
    .then(response => response.text());
}

const generateTag = () => {
  return fetchTag(`[%ThirdPartyTag%]`);
}

const insertTag = (tag) => {
  const placeholder = document.getElementById('js-fabric-custom-third-party');
  const range = document.createRange();
  range.setStart(placeholder, 0);
  range.setEnd(placeholder, 0);
  placeholder.appendChild(range.createContextualFragment(tag));
};

getIframeId()
.then(() => getWebfonts())
.then(() => generateTag())
.then(tag => insertTag(tag))
.then(() => resizeIframeHeight());
