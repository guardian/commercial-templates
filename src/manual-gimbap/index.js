// Adds quotes to title if set in DFP.
Array.from(document.getElementsByClassName('gimbap__title'), (title) => {
	title.insertAdjacentHtml('afterbegin', quoteSvg);
});

// Inserts appropriate SVG logos for certain tones.
var offerTones = ['[%Offer1Tone%]', '[%Offer2Tone%]', '[%Offer3Tone%]',
	'[%Offer4Tone%]'];

Array.from(document.getElementsByClassName('gimbap-logo'), (logo, idx) => {
	logo.insertAdjacentHtml('afterbegin', logoSvgs[offerTones[idx]]);
});

// Adds author class if there is an author image URL present in DFP.
if ('[%Offer1AuthorImage%]') {
	document.getElementsByClassName('gimbap')[0].classList.add('gimbap--has-author');
}
