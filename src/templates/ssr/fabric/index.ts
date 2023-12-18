import { onScroll } from '$lib/messenger/on-scroll.js';
import { onViewport } from '$lib/messenger/on-viewport.js';
import {
	getIframeId,
	reportClicks,
	resizeIframeHeight,
	sendMessage,
} from '../../../../legacy/src/_shared/js/messages.js';
import { write } from '../../_shared/js/dom.js';

const layer2 = document.getElementById('layer2');
const linkDesktop = document.getElementById('linkDesktop');

if (layer2.classList.contains('creative__layer2--animation-disabled')) {
	write(() => (layer2.style.backgroundPosition = '{Layer2BackgroundPosition}'));
}

const isMobile = window.matchMedia('(max-width: 739px)').matches;
const isTablet = window.matchMedia(
	'(min-width: 740px) and (max-width: 979px)',
).matches;
handleBackground(isMobile, isTablet);

if (
	!isMobile &&
	layer2.classList.contains('creative__layer2--animation-enabled')
) {
	onViewport()
		.then(async ({ height }) => {
			const { top, bottom } = await onScroll();
			if (0 <= top && bottom <= height) {
				layer2.classList.add('is-animating');
				return Promise.resolve();
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

function handleBackground(isMobile, isTablet) {
	const scrollType = '{BackgroundScrollType}';
	const backgroundColour = '{BackgroundColour}';
	const [backgroundImage, backgroundPosition, backgroundRepeat, creativeLink] =
		isMobile
			? [
					'{MobileBackgroundImage}',
					'{MobileBackgroundImagePosition}',
					'{MobileBackgroundImageRepeat}',
					document.getElementById('linkMobile'),
			  ]
			: [
					'{BackgroundImage}',
					'{BackgroundImagePosition}',
					'{BackgroundImageRepeat}',
					document.getElementById('linkDesktop'),
			  ];

	handlePadding(scrollType);

	if (backgroundColour) {
		document.documentElement.style.backgroundColor = backgroundColour;
	}

	if (!backgroundImage) return;
	if (scrollType === 'none') {
		write(() => {
			Object.assign(creativeLink.style, {
				backgroundImage: `url('${backgroundImage}')`,
				backgroundPosition,
				backgroundRepeat,
			});
		});
	} else {
		sendMessage('background', {
			scrollType:
				scrollType === 'parallax' && (isMobile || isTablet)
					? 'fixed'
					: scrollType,
			backgroundColour,
			backgroundImage: `url('${backgroundImage}')`,
			backgroundRepeat,
			backgroundPosition,
		});
	}
}

function handlePadding(scrollType) {
	if (scrollType === 'parallax') {
		linkDesktop !== undefined ? linkDesktop.classList.add('is-parallax') : '';
	}
}

function handleLayer2(height) {
	onScroll(({ top, bottom }) => {
		if (0 <= top && bottom <= height) {
			layer2.classList.add('is-animating');
			return false;
		}
	});
}
