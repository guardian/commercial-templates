import { getIframeId, getWebfonts } from '../_shared/js/messages.js';
import { cleanupButtons } from '../_shared/js/creatives.js';

cleanupButtons();

getIframeId().then(() => {
    getWebfonts();
});
