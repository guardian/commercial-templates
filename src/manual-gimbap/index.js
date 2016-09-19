// Adds quotes to title if set in DFP.
Array.from(document.getElementsByClassName('gimbap__title'), (title) => {
	title.insertAdjacentHTML('afterbegin', quoteSvg);
});

// Inserts appropriate SVG logos for certain tones.
var offerTones = ['[%Offer1Tone%]', '[%Offer2Tone%]', '[%Offer3Tone%]',
	'[%Offer4Tone%]'];

Array.from(document.getElementsByClassName('gimbap-logo'), (logo, idx) => {
	logo.insertAdjacentHTML('afterbegin', logoSvgs[offerTones[idx]]);
});

// Adds author image if there is an author image URL present in DFP.
if ('[%Offer1AuthorImage%]') {

	var firstGimbap = document.getElementsByClassName('gimbap')[0];

	firstGimbap.classList.add('gimbap--has-author');
	firstGimbap.insertAdjacentHTML('afterbegin',
		'<img class="gimbap__author" src="[%Offer1AuthorImage%]" alt="" />');

}
