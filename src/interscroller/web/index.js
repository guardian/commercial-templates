import { getIframeId, sendMessage, onViewport } from '../../_shared/js/messages.js';
import { once } from '../../_shared/js/utils';

const updateBackground = () => {

    const [ scrollType,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition,
        backgroundSize,
        maxWidth,
        maxHeight,
        ctaUrl ] = [
        'interscroller',
        `url('[%BackgroundImage%]')`,
        'no-repeat',
        'center center',
        'cover',
        '500px',
        '800px',
        `[%ClickthroughUrl%]`
    ];

    sendMessage('background', {
        scrollType,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition,
        backgroundSize,
        maxWidth,
        maxHeight,
        ctaUrl
    });
};

getIframeId()
.then(() => {
    onViewport(once(updateBackground));
});
