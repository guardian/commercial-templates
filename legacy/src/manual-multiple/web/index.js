import { getIframeId, getWebfonts, reportClicks, resizeIframeHeight, onViewport } from '../../_shared/js/messages';
import { cleanupButtons } from '../../_shared/js/creatives';
import { write } from '../../_shared/js/dom';

function injectBranchLogo() {
  let componentTone   = '[%Tone%]';

  Array.from(document.getElementsByClassName('brand_logo')).forEach(insertHeaderSvg);

  function insertHeaderSvg(div) {
    write( () => div.insertAdjacentHTML('afterbegin', logoSvgs[componentTone]) );
  }
};

cleanupButtons();
injectBranchLogo();

getIframeId()
  .then(() => Promise.all([getWebfonts(), reportClicks()]))
  .then(() => {
      let lastWidth;
      onViewport(({ width }) => {
          if( width !== lastWidth ) {
              lastWidth = width;
              resizeIframeHeight();
          }
      });
  });
