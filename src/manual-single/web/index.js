import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks, onViewport } from '../../_shared/js/messages.js';
import { cleanupButtons } from '../../_shared/js/creatives-single-item';

cleanupButtons();
reportClicks();

// logo javascript
          getIframeId()
              .then(() => Promise.all([getWebfonts(), reportClicks(), formatGimbap()]))
          .then(() => resizeIframeHeight());

          function formatGimbap() {

              let componentTone   = '[%Tone%]';

              Array.from(document.getElementsByClassName('brand_logo')).forEach(insertHeaderSvg);

              function insertHeaderSvg(div) {
                  div.insertAdjacentHTML('afterbegin', logoSvgs[componentTone]);
              }
          };


reportClicks();
getIframeId()
.then(() => getWebfonts())
.then(() => {
    let lastWidth;
    onViewport(({ width }) => {
        if( width !== lastWidth ) {
            lastWidth = width;
            resizeIframeHeight();
        }
    });
});
