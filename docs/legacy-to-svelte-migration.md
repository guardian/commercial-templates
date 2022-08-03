# Migrating Templates to Svelte

The migrations should require a lot less code and boilerplate than their legacy cousins.

The legacy templates typically start with a call to `getIframeId` which is deprecated in our svelte templates.

They'll then often use some shared legacy functionality like `resizeIframeHeight` and `sendMessage`, these wrap a post message to the parent frame in additional boilerplate that's probably no longer needed and in many cases can be replaced with a simple [`post`](/src/lib/messenger.ts).

## Example - Interscroller
### Legacy
index.js
```js
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

getIframeId()
.then(() => {onViewport(once(updateBackground));})
.then(() => resizeIframeHeight('85vh'));
```
 index.html
```html
<div class="creative--interscroller">
    <img src="[%TrackingPixel%]" class="creative__pixel creative__pixel--displayNone">
    <img src="[%ResearchPixel%]" class="creative__pixel creative__pixel--displayNone">
    <img src="[%ViewabilityTracker%]" class="creative__pixel creative__pixel--displayNone">
</div>
```
index.scss
```css
@import '_core';

.creative--interscroller {
    margin-top: 24px;
}

.creative__pixel--displayNone {
    display: none;
}
```

### Svelte
* Combine js, html and css into a `.svelte` file
* The `getIframeId` can be removed
* `sendMessage` can be replaced with `post`
* `resizeIframeHeight` can be replaced with post
* `onViewport` isn't used so can be removed

So we're left with:
```html
<script lang="ts">
    import { post } from '$lib/messenger';

    post({
        type: 'background',
        value: {
            scrollType: 'interscroller',
            backgroundImage: `url('[%BackgroundImage%]')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            ctaUrl: `%%CLICK_URL_UNESC%%%%DEST_URL%%`,
        },
    });

    post({
        type: 'set-ad-height',
        value: {
            width: -1,
            height: '85vh',
        },
    });
</script>

<div class="creative--interscroller">
	<img
		src="[%TrackingPixel%]"
		class="creative__pixel creative__pixel--displayNone"
	/>
	<img
		src="[%ResearchPixel%]"
		class="creative__pixel creative__pixel--displayNone"
	/>
	<img
		src="[%ViewabilityTracker%]"
		class="creative__pixel creative__pixel--displayNone"
	/>
</div>

<style lang="scss">
	.creative--interscroller {
		margin-top: 24px;
	}

	.creative__pixel--displayNone {
		display: none;
	}
</style>
```
