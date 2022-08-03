# Svelte Template Authoring

There are two main types of templates, which live in different folders.

### Pre-rendered (SSR)
These are HTML + CSS, where Ad Manager variables are replaced by
the creative serving them. Many of the templates fit this category, such as `fabric`,
`fabric-video`, `manual`, etc. They live in the [`/src/templates/ssr`](/src/templates/ssr) directory.

### Dynamic (CSR)
Dynamic templates need to make a request to an api in order to generate their
content, they are effectively tiny web apps. These are mainly the `capi-*` templates, e.g. `capi-single-paidfor`.
These only generate JS + CSS, and the HTML is generated on the client by svelte.
They live in the [`/src/templates/csr`](/src/templates/csr) directory.

## Creating a template

Templates themselves are defined by a directory living inside the `csr` or `ssr`
folders. The files making up a template are:

-   `index.svelte` (required)
-   `test.json` (optional, only for development purposes)
-   `README.md` (optional description)

So by creating a directory inside `ssr` or `csr` adding an index.svelte file and you have the basics of a template.

## Anatomy of a Svelte template

A template consists of `html` sandwiched in `script` and `style` tags.
Ad Manager variables are identified with the `Prop` type and the build tool automatically
replaces them with the correct string, e.g. `[%MyVar%]`.

```html
<script lang="ts">
	import type { GAMVariable } from '$lib/gam';

	export let MyVar: GAMVariable;
</script>

<aside>My ad content with {MyVar}</aside>

<style>
	aside {
		color: white;
		background-color: black;
	}
</style>
```

## More Tips

To learn more more about Svelte, you can [follow their tutorial](https://svelte.dev/tutorial/basics).

## Viewing your template

Run `yarn dev` to start the local preview environment and head to [`http://localhost:7777`](http://localhost:7777) and click on your template in the list.

You should see a preview and the code at the bottom of the page.

## Deploying your template

Copy and paste the code at the bottom of the page into the Native Template in Google Ad Manager.

**Note:** The compiled template code is not written to a file.

## Resources

* [Svelte Docs](https://svelte.dev/docs)
* [Sveltekit Docs](https://kit.svelte.dev/docs/introduction)
