import type { GAMVariable } from '$lib/gam';
import { post } from '$lib/messenger';

const linkDesktop: HTMLElement | null = document.getElementById('linkDesktop');

const isMobile: boolean = window.matchMedia('(max-width: 739px)').matches;
const isTablet: boolean = window.matchMedia(
	'(min-width: 740px) and (max-width: 979px)',
).matches;
handleBackground(isMobile, isTablet);

//creative background div for parallax scrolling
function handleBackground(isMobile: boolean, isTablet: boolean) {
	const scrollType: GAMVariable = '[%BackgroundScrollType%]';
	const backgroundColour: GAMVariable | null = '[%BackgroundColour%]';
	const [backgroundImage, backgroundPosition, backgroundRepeat, creativeLink] =
		isMobile
			? [
					'[%MobileBackgroundImage%]',
					'[%MobileBackgroundImagePosition%]',
					'[%MobileBackgroundImageRepeat%]',
					document.getElementById('linkMobile'),
			  ]
			: [
					'[%BackgroundImage%]',
					'[%BackgroundImagePosition%]',
					'[%BackgroundImageRepeat%]',
					document.getElementById('linkDesktop'),
			  ];

	document.documentElement.style.backgroundColor = backgroundColour;

	if (!backgroundImage) return;
	if (scrollType.includes('none')) {
		write(() => {
			Object.assign(creativeLink.style, {
				backgroundImage: `url('${backgroundImage}')`,
				backgroundPosition,
				backgroundRepeat,
			});
		});
	} else {
		post({
			type: 'background',
			value: {
				scrollType:
					scrollType.includes('parallax') && (isMobile || isTablet)
						? 'fixed'
						: scrollType,
				backgroundColour,
				backgroundImage: `url('${backgroundImage}')`,
				backgroundRepeat,
				backgroundPosition,
			},
		});
		//css class added to fix padding issue
		linkDesktop ? linkDesktop.classList.add('is-parallax') : '';
	}
}

export {};
