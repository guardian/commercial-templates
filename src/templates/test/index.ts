import Test from './Test.svelte';

new Test({
	//@ts-expect-error -- This element exists
	target: document.querySelector('#svelte'),
	props: {
		info: '[%info%]',
	},
});
