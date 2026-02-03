# Svelte Template Authoring

## Creating a template

Templates themselves are defined as sveltekit routes in the `src/routes/templates` directory.

- `+page.svelte` (required)
- `+page.server.ts` (optional, if your templates needs GAM variables)
- `README.md` (optional description)
- `variables.ts` (optional, if your template needs GAM variables)

## Anatomy of a Svelte template

A template consists of `html` sandwiched in `script` and `style` tags.
Ad Manager variables are passed to the template/route as part of the page data.

```html
<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let { MyVar } = data;
</script>

<aside>My ad content with {MyVar}</aside>

<style lang="scss">
	aside {
		color: white;
		background-color: black;
	}
</style>
```

## More Tips

To learn more more about Svelte, you can [follow their tutorial](https://svelte.dev/tutorial/basics).

## Viewing your template

Run `pnpm dev` to start the local preview environment and head to [`http://localhost:7777`](http://localhost:7777) and click on your template in the list.

You should see previews of the template at various sizes.

## Deploying your template

Add an `ad.json` file to the template directory that contain a key `nativeStyleId` for the corresponding native template in GAM. The deployment happens automatically on merge to main as long as there is an `ad.json` file to match against in GAM. For more info check this [doc](https://github.com/guardian/commercial-templates/tree/main/scripts/deploy).

## Resources

- [Svelte Docs](https://svelte.dev/docs)
- [Sveltekit Docs](https://kit.svelte.dev/docs/introduction)
