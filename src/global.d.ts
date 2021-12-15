/// <reference types="@sveltejs/kit" />

declare module '*.svelte' {
	export { SvelteComponentDev as default } from 'svelte/internal';
}
