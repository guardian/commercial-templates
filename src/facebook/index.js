import { getIframeId, getWebfonts, resizeIframeHeight, onScroll, onViewport, reportClicks } from '../_shared/js/messages';
import { enableToggles } from '../_shared/js/ui';
import { write } from '../_shared/js/dom.js';

enableToggles();
reportClicks();
getIframeId()
.then(() => getWebfonts())
.then(resizeIframeHeight);

function(config, loadScript, reportError, facebookStr) {

    function Facebook($adSlot, params) {
        facebookTpl || (facebookTpl = template(facebookStr));
        labelTpl || (labelTpl = template(labelStr));
    }

var placementID = '180444840287_10154600557405288';

function bland() {
      return new Promise(function (resolve, reject) {
            window.fbAsyncInit || (window.fbAsyncInit = function() {
              FB.init({
                appId      : '',
                xfbml      : true,
                version    : 'v2.8'
              });
              FB.AppEvents.logPageView();
            };

            FB.Event.subscribe(
              'ad.loaded',
              function(placementID) {
                var interim = document.querySelector('[data-placementid=' + placementID +']');
                var ad = document.getElementById(interim.getAttribute('data-nativeadid'));
                if (ad) {
                  write(function () {
                    ad.style.display = 'block';
                    resolve(true);
                  });
                } else {
                  resolve(false);
                }
              }
            );

                FB.Event.subscribe(
                    'ad.error',
                    function(errorCode, errorMessage, placementID) {
                        reportError(new Error('Facebook returned an empty ad response'), {
                            feature: 'commercial',
                            placementID: placementID,
                            errorMessage: errorMessage
                        }, false);
                        reject();
                    }
                );
            });

            var markup = facebookTpl(assign({ externalLink: svgs('externalLink'), testMode: this.params.testMode }, adUnits[this.params.placement]));;
        }.bind(this));
    };

}
