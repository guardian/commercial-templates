import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks } from '../_shared/js/messages';
import { enableToggles } from '../_shared/js/ui';

window.fbAsyncInit || (window.fbAsyncInit = function() {
    FB.Event.subscribe('ad.loaded', function(placementID) {
        var interim = document.querySelector('[data-placementid="' + placementID + '"]');
        var ad = document.getElementById(interim.getAttribute('data-nativeadid'));
        if (ad) {
            fastdom.write(function () {
                ad.style.display = 'block';
            });
        }
    });

    FB.Event.subscribe('ad.error', function(errorCode, errorMessage, placementID) {
        console.log(errorCode, errorMessage, placementID);
    });
});

enableToggles();
reportClicks();
getIframeId()
.then(() => getWebfonts())
.then(resizeIframeHeight);
