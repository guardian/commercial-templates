import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks } from '../../_shared/js/messages';
import { enableToggles } from '../../_shared/js/ui';
import { write } from '../../_shared/js/dom';

Promise.all([
    new Promise((resolve) => {
        window.fbAsyncInit = () => {
            FB.Event.subscribe('ad.loaded', (placementID) => {
                var interim = document.querySelector('[data-placementid="' + placementID + '"]');
                var ad = document.getElementById(interim.getAttribute('data-nativeadid'));
                if (ad) {
                    write(() => ad.style.display = 'block')
                    .then(resolve);
                }
            });

            FB.Event.subscribe('ad.error', (errorCode, errorMessage, placementID) => {
                console.log(errorCode, errorMessage, placementID);
                resolve();
            });
        }
    }),
    getIframeId()
    .then(() => {
        enableToggles();
        reportClicks();
        return getWebfonts();
    })
])
.then(() => resizeIframeHeight());
