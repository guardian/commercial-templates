import { getIframeId, getWebfonts, resizeIframeHeight, onScroll, onViewport } from '../_shared/js/messages';
import { enableToggles } from '../_shared/js/ui';

enableToggles();
getIframeId()
.then(setDataTarget('[%Openlinksinnewwindow%]'))
.then(getWebfonts())
.then(resizeIframeHeight);

function getDataTarget(windowTag) {
    let clickWindow = windowTag === 'yes' ?'_blank' : '_self';
    return clickWindow;
 }

function setDataTarget(windowTag) {
   let targetAttribute = getDataTarget(windowTag);
   let links = Array.from(document.getElementsByTagName('a'));

   links.forEach(function(link) {
     link.target = targetAttribute;
   });
 }
