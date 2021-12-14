//@flow
import { getIframeId, resizeIframeHeight, getWebfonts } from '../../_shared/js/messages';
import { write } from '../../_shared/js/dom';

getIframeId()
.then(() => getWebfonts())
.then(() => resizeIframeHeight());
