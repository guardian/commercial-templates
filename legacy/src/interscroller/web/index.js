import { getIframeId, sendMessage,resizeIframeHeight, onViewport } from '../../_shared/js/messages.js';
import { once } from '../../_shared/js/utils';

const updateBackground = () => {

    const [ scrollType,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition,
        backgroundSize,
        ctaUrl ] = [
        'interscroller',
        `url('[%BackgroundImage%]')`,
        'no-repeat',
        'center center',
        'cover',
        `%%CLICK_URL_UNESC%%%%DEST_URL%%`
    ];

    sendMessage('background', {
        scrollType,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition,
        backgroundSize,
        ctaUrl
    });
};

getIframeId('interscroller')
.then(() => {onViewport(once(updateBackground));})
.then(() => resizeIframeHeight('85vh'));
