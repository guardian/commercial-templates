import Test from './Test.svelte';

new Test({
	target: document.querySelector('#svelte'),
	props: {
		info: '[%info%]'
	}
});
