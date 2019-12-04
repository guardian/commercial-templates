import { getIframeId, sendMessage, onViewport } from '../../_shared/js/messages.js';
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
        `[%ClickthroughUrl%]`
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

getIframeId()
.then(() => {
    onViewport(once(updateBackground));
});
