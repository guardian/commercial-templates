import { enableToggles } from '../../_shared/js/ui';
import { addTrackingPixel } from '../../_shared/js/ads';
import { write } from '../../_shared/js/dom';
import { generatePicture } from '../../_shared/js/capi-images';
import { URLSearchParams } from '../../_shared/js/utils';

const ENDPOINT = 'https://api.nextgen.guardianapps.co.uk/commercial/api/traffic-driver.json';

const OVERRIDES = {
    headline: '[%ArticleHeaderText%]',
    text: '[%ArticleText%]',
    imageUrl: '[%ArticleImage%]'
};

// Loads the article data from CAPI in JSON format.
function retrieveCapiData() {
    let params = new URLSearchParams();
    params.append('t', '[%ArticleShortURL%]')
    let url = `${ENDPOINT}?${params}`;
    return fetch(url).then(response => response.json());
}

// Uses cAPI data to build the ad content.
function buildFromCapi ({ articleHeadline, articleUrl, articleImage, edition }) {
    let imageContainer = document.getElementById('Ctu')

    imageContainer.href = `%%CLICK_URL_UNESC%%${articleUrl}`;

    let title = document.getElementById('Title');

    let image = generatePicture({
        url: OVERRIDES.imageUrl || articleImage.backupSrc,
        classes: ['creative__image'],
        sources: articleImage.sources
    });

    return write(() => {
        title.textContent = OVERRIDES.headline || articleHeadline;
        imageContainer.insertAdjacentHTML('afterbegin', image);
    });
}

enableToggles();
addTrackingPixel();
retrieveCapiData()
.then(buildFromCapi);
