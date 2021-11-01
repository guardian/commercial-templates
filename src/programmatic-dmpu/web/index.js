//@flow
import { getIframeId, resizeIframeHeight, getWebfonts } from '../../_shared/js/messages';

getIframeId()
.then(() => getWebfonts())
.then(() => resizeIframeHeight());
