// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@types/google-publisher-tag" />

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		googletag?: typeof googletag;
	}
}

export {};
