import {
	addTrackingPixel,
	getDapAssetsPath,
	getTag,
} from '$lib/fabric-custom-shared';
import { post } from '$lib/messenger';

const DapAssetsFolder: string = '[%DapAssetsFolder%]';

const DapAssetsPath = getDapAssetsPath(DapAssetsFolder);
const TrackingPixel: string = '[%TrackingPixel%]';
const ResearchPixel: string = '[%ResearchPixel%]';

/**
 * This is a hack to insert the html into the DOM,
 * using innerHtml would not work if the tag contains a script tag
 * see https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations
 *
 * @param tag the html to insert
 */
const insertTag = (tag: string) => {
	const placeholder = document.getElementById('creative-link')!;
	const range = document.createRange();
	range.setStart(placeholder, 0);
	range.setEnd(placeholder, 0);
	placeholder.appendChild(range.createContextualFragment(tag));
};

getTag(DapAssetsFolder, DapAssetsPath)
	.then((tag) => {
		insertTag(tag);
		post({
			type: 'resize',
			value: { height: document.getElementById('creative')!.offsetHeight },
		});
	})
	.catch((e) => {
		console.error(e);
	});

if (TrackingPixel) {
	addTrackingPixel(TrackingPixel);
}

if (ResearchPixel) {
	addTrackingPixel(ResearchPixel);
}
