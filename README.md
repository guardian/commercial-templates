# Guardian Commercial Templates

This projects creates bespoke ads that fit perfectly on [The Guardian][],
known as “native” in Google Ad Manager parlance.

[the guardian]: https://theguardian.com/

Aiming to provide a great developer and reader experience, this project uses
[Svelte][] to build the template, and [SvelteKit][] to help preview development.
You can see the current templates on [guardian.github.io/commercial-templates](https://guardian.github.io/commercial-templates/).

[svelte]: https://svelte.dev/
[sveltekit]: https://kit.svelte.dev/

- [More information on creating Svelte templates](/docs/svelte-template-authoring.md)

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

## Visual Regression Testing

This repository has visual regression testing to help prevent the introduction of visual changes or bugs into the templates. The tests work by checking the templates on a local version of the dev site, which will include any changes on that branch, against the templates as they currently are on the main branch, on the GitHub pages site.

### Running the tests

On each PR, visual regression testing is automatically triggered to check the code changes don't have any inadvertent effects on the design of the templates. You can run these tests locally using one of the following commands. Adding the `--ui` suffix will open a UI that you can use to run the tests, which can be useful when debugging.

```bash
pnpm playwright test

pnpm playwright test --ui
```

**Note** that you need to have the site running locally (eg. run `pnpm dev`) in order for the tests to work.

The test results are outputted into the `test-results` folder. If any tests failed, screenshots showing the expected image, actual image, and diff between the two images are stored in there to help you spot what might be causing the failure.

### Adding a test

When a template has been migrated to Svelte, it's a good idea to add a visual regression test for it to help safeguard against visual bugs in the future. The visual regression test files can be found in the `playwright` folder.

Each test consists of two main steps - taking the reference screenshots, and then taking screenshots on the local branch and comparing them to the references. Most of the test files are pretty similar, but will have small differences to account for the quirks of some templates. For example, we remove the autoplay attribute from the Fabric Video template to try and ensure a repeatable screenshot when testing, by avoiding false diffs caused by the video playing to different points when the screenshot is being taken.

The easiest way to add a visual regression test for a template is to copy an existing test, update the test URLs and names, and make any changes needed for that specific template test to run reliably.

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
