import { write } from '$lib/dom';
import { gamVar } from '$lib/gam';
import { post } from '$lib/messenger';

type ParallaxBackgroundSize = '740px 500px' | '1300px 700px';
const linkDesktop: HTMLElement | null = document.getElementById('linkDesktop');
const isMobile: boolean = window.matchMedia('(max-width: 739px)').matches;

const backgroundSize: ParallaxBackgroundSize = isMobile
	? '740px 500px'
	: '1300px 700px';

//creative background div for parallax scrolling
const handleBackground = (isMobile: boolean) => {
	/** This can be either "vertical" or "horizontal" */
	const scrollType = gamVar('BackgroundScrollType');
	const backgroundColor = gamVar('BackgroundColor');
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

	if (!backgroundImage) return;
	if (scrollType.includes('none') && creativeLink) {
		void write(() => {
			Object.assign(creativeLink.style, {
				backgroundImage: `url('${backgroundImage}')`,
				backgroundPosition,
				backgroundRepeat,
			});
		});
	}
	//Wanted to just use background-size:cover here, but parallax effect does not
	//work on mobile, setting px sizes was the soloution
	if (scrollType.includes('parallax')) {
		post({
			type: 'background',
			value: {
				ctaUrl: '',
				scrollType,
				backgroundColor,
				backgroundImage: `url('${backgroundImage}')`,
				backgroundRepeat,
				backgroundPosition,
				backgroundSize,
			},
		});

		//css class added to fix padding issue
		if (linkDesktop && scrollType.includes('parallax')) {
			linkDesktop.classList.add('is-parallax');
		}
	}
};

handleBackground(isMobile);

export {};
