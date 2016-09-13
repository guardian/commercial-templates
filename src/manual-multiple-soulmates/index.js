import { getIframeId, getWebfonts } from '../_shared/js/messages.js';
import { write } from '../_shared/js/dom.js';
import { cleanupButtons } from '../_shared/js/creatives.js';

cleanupButtons();

getIframeId().then(() => {
    getWebfonts();
});
