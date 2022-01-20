# Guardian Commercial Templates

This projects creates bespoke ads that fit perfectly on [The Guardian][],
known as “native” in Google Ad Manager parlance.

[The Guardian]: https://theguardian.com/

Aiming to provide a great developer and reader experience, this project uses
[Svelte][] to build the template, and [SvelteKit][] to help preview development.
You can see the current templates on [guardian.github.io/commercial-templates](https://guardian.github.io/commercial-templates/).

[svelte]: https://svelte.dev/
[sveltekit]: https://kit.svelte.dev/

This project is a rewrite and work-in-progress. Legacy templates can still be
found in the [`/legacy` folder](/legacy)

## Developing

Once you've created a project and installed dependencies with `npm install`,
start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building & Deploying

```bash
npm run deploy
```

> You can preview the built app with `npm run preview`, regardless of whether
you installed an adapter. This should _not_ be used to serve your app
in production.

