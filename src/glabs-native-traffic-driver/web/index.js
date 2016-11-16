import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks } from '../../_shared/js/messages';
import { enableToggles } from '../../_shared/js/ui';
import { addTrackingPixel, setEditionLink } from '../../_shared/js/ads';
import { write } from '../../_shared/js/dom';
import { generatePicture } from '../../_shared/js/capi-images';
import { URLSearchParams } from '../../_shared/js/utils';

const ENDPOINT = 'https://api.nextgen.guardianapps.co.uk/commercial/api/traffic-driver.json';

const OVERRIDES = {
    headline: '[%ArticleHeaderText%]',
    text: '[%ArticleText%]',
    imageUrl: '[%ArticleImage%]',
    imageAlt: '[%ArticleImageAlternateText%]'
};

// Loads the article data from CAPI in JSON format.
function retrieveCapiData() {
    let params = new URLSearchParams();
    params.append('t', '[%ArticleShortURL%]')
    let url = `${ENDPOINT}?${params}`;
    return fetch(url).then(response => response.json());
}

// Uses cAPI data to build the ad content.
function buildFromCapi (host, { articleHeadline, articleText, articleUrl, articleImage, edition }) {
    Array.from(document.getElementsByClassName('creative__ctu')).forEach(ctu => ctu.href = articleUrl);

    let title = document.getElementById('Title');
    let text = document.getElementById('Text');

    let imageContainer = document.getElementById('ImageContainer');
    let image = generatePicture({
        url: OVERRIDES.imageUrl || articleImage.backupSrc,
        classes: ['creative__image'],
        sources: articleImage.sources,
        alt: OVERRIDES.imageAlt
    });

    setEditionLink(host, edition, document.getElementById('GlabsLink'));

    return write(() => {
        title.textContent = OVERRIDES.headline || articleHeadline;
        text.textContent = OVERRIDES.text || articleText;
        imageContainer.insertAdjacentHTML('afterbegin', image);
    });
}

reportClicks();
enableToggles();
getIframeId()
.then(({ host }) => {
    return Promise.all([
        getWebfonts(['GuardianTextSansWeb', 'GuardianSansWeb']),
        retrieveCapiData()
        .then(data => buildFromCapi(host, data))
        .then(() => {
            addTrackingPixel(document.getElementById('creative'));
        })
    ])
})
.then(() => resizeIframeHeight());
