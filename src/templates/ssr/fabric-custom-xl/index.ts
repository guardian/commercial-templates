import { addTrackingPixel, getTag, insertTag } from '$lib/fabric-custom-shared';
import { post } from '$lib/messenger';

const DapAssetsFolder: string = '[%DapAssetsFolder%]';

const TrackingPixel: string = '[%TrackingPixel%]';
const ResearchPixel: string = '[%ResearchPixel%]';

/**
 * This is a hack to insert the html into the DOM,
 * using innerHtml would not work if the tag contains a script tag
 * see https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations
 *
 * @param tag the html to insert
 */

getTag(DapAssetsFolder)
	.then((tag) => {
		insertTag(tag);
		post({
			type: 'resize',
			value: { height: 524 },
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
