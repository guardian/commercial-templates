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

Once you've created a project and installed dependencies by running `pnpm i`,
start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev --open
```

When you change templates or shared components, the components will
reload automatically. [Read more about Svelte templates in `src/templates/`][t]

[t]: docs/svelte-template-authoring.md

## Deploying to Github Pages

Deploying is done via building the project using the static adapter, and then
pushing the `build` folder to the `gh-pages` branch.

```bash
pnpm deploy
```

> You can build the app by running `pnpm build` and then preview it with `pnpm preview`,
> regardless of whether you installed an adapter.
> This should _not_ be used to serve your app in production.

## Testing a Creative in GAM

- Create a Native Format

  - Open GAM
  - Click Native in the left hand menu and go to the Native Formats tab
  - Find the Native Template you are working on, click the checkbox, select "Copy"
  - Rename the template to "{template name} TEST"

- Create a Native Style

  - Click Native in the left hand menu and go to the Native Formats tab
  - Click "New Native Style"
  - Select "HTML & CSS editor"
  - Enter a name: "{Template Name} Test"
  - Ad size: Fluid
  - Ad Targeting:
    - Inventory: theguardian.com
  - Native Format: Select the format you created in the previous step
  - Click Continue
  - Paste in the HTML and CSS
  - Click Save and Activate

- Create a Line Item

  - Find an existing Line Item used for testing, from the comm Dev Test Order, such as [this one](https://admanager.google.com/59666047#delivery/line_item/detail/line_item_id=6492048457)
  - Copy without creatives
    - Update the Name
    - Update Expected Creatives to your native format
    - Set Start Time to "Immediately"
    - Update the custom targeting. Adding a value for adtest and slot is strongly advised

- Create a Creative

  - Go to Creative tab of your line item
  - Add new creative
  - Add a name, any destination and the variables that your template depends on

- Go to Line item and click Resume

- Test the line item on the live site, by going to the page you want to test and appending the adtest parameter.
