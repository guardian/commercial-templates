# Templates

## Anatomy of a Svelte template

In its basic form, a template consists of `html` sandwiched in `script` and `style` tags.
Ad Manager variables are identified with the `Prop` type and the build tool automatically
replaces them with the correct string, e.g. `[%MyVar%]`.

```html
<script lang="ts">
    import type { Prop } from '$lib/svelte';

    export let MyVar: Prop;
</script>

<aside>My ad content with {MyVar}</aside>

<style>
    aside {
        color: white;
        background-color: black;
    }
</style>
```

To learn more more about Svelte, you can [follow their tutorial](https://svelte.dev/tutorial/basics).

## Static vs Dynamic

There are two main types of templates, which live in different folders.

Static templates are bare HTML + CSS, where Ad Manager variables are replaced by
the create serving them. Many of the templates fit this category, such as `fabric`,
`fabric-video`, `manual`, etc. They live in the [`src/templates/ssr/` folder](ssr/).

Dynamic templates need to make a request to an api in order to generate their
content. These are mainly the `capi-*` templates, e.g. `capi-single-paidfor`.
These only generate JS + CSS, and the HTML is generated on the client by svelte.
They live in the [`csr/` folder](csr/).