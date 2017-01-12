import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks } from '../../_shared/js/messages';
import { enableToggles } from '../../_shared/js/ui';
import { addTrackingPixel } from '../../_shared/js/ads';
import { write } from '../../_shared/js/dom';
import addColourContrastClass from '../../_shared/js/hosted-colours.js';
import { generatePicture } from '../../_shared/js/capi-images';
import { URLSearchParams } from '../../_shared/js/utils';

const ENDPOINT = 'https://api.nextgen.guardianapps.co.uk/commercial/api/traffic-driver.json';

const OVERRIDES = {
    headline: '[%ArticleHeadline%]',
    imageUrl: '[%ArticleImage%]'
};

// Loads the article data from CAPI in JSON format.
function retrieveCapiData() {
    let shortUrl = '[%ArticleShortURL%]';
    if(shortUrl.length === 0) return Promise.resolve();
    let params = new URLSearchParams();
    params.append('t', '[%ArticleShortURL%]');
    let url = `${ENDPOINT}?${params}`;
    return fetch(url).then(response => response.json());
}

// Uses cAPI data to build the ad content.
function buildFromCapi ({ articleHeadline, articleUrl, articleImage }) {
    Array.from(document.getElementsByClassName('creative__ctu')).forEach(ctu => ctu.href = articleUrl);

    let title = document.getElementById('Title');

    let imageContainer = document.getElementById('ImageContainer');
    let image = generatePicture({
        url: OVERRIDES.imageUrl || articleImage.backupSrc,
        classes: ['creative__image'],
        sources: !OVERRIDES.imageUrl && articleImage.sources
    });

    return write(() => {
        if(!OVERRIDES.headline) title.textContent = articleHeadline;
        imageContainer.insertAdjacentHTML('afterbegin', image);
    });
}

reportClicks();
enableToggles();
getIframeId()
.then(() => {
    return Promise.all([
        addColourContrastClass(),
        getWebfonts(['GuardianTextSansWeb', 'GuardianSansWeb']),
        retrieveCapiData()
        .then(data => buildFromCapi(data || {}))
        .then(() => {
            addTrackingPixel(document.getElementById('creative'));
        })
    ])
})
.then(() => resizeIframeHeight());
