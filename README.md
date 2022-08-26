# Guardian Commercial Templates

This projects creates bespoke ads that fit perfectly on [The Guardian][],
known as “native” in Google Ad Manager parlance.

[the guardian]: https://theguardian.com/

Aiming to provide a great developer and reader experience, this project uses
[Svelte][] to build the template, and [SvelteKit][] to help preview development.
You can see the current templates on [guardian.github.io/commercial-templates](https://guardian.github.io/commercial-templates/).

[svelte]: https://svelte.dev/
[sveltekit]: https://kit.svelte.dev/

This project is a rewrite and work-in-progress. Legacy templates can still be
found in the [`/legacy` folder](/legacy)

- [More information on creating Svelte templates](/docs/svelte-template-authoring.md)
- [More information on migrating legacy templates](/docs/legacy-to-svelte-migration.md)

## Developing Locally

Once you've created a project and installed dependencies by running `yarn`,
start a development server:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev --open
```

When you change templates or shared components, the components will
reload automatically. [Read more about Svelte templates in `docs/`][t]

[t]: docs/svelte-template-authoring.md

## Deploying to Github Pages

Deploying is done via building the project using the static adapter, and then
pushing the `build` folder to the `gh-pages` branch.

```bash
yarn deploy
```

> You can build the app by running `yarn build` and then preview it with `yarn preview`,
> regardless of whether you installed an adapter.
> This should _not_ be used to serve your app in production.
