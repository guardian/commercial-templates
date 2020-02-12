# Commercial templates

- Templates live in `src`, and current versions can be viewed at commercial/test-page (either on CODE, or when running frontend locally)
- Create a `src/template-name` for the template you're migrating
- Generate `index.html`, `index.scss` and `index.js` following current standards and the specification doc
- Ensure that you are running at least `node` version 6. (You might want to run `nvm use 6`.)
- At the root of the repository run `npm install` and `npm run build`.  
  This will generate HTML and CSS artefacts under `/build/<template-name>`, which can be copied into native styles in DFP.
- You should now be able to test your templates.

## Testing Locally (Previewing)

There is a local test server included in the `preview` directory. To use it simply mock up DFP variables in a test JSON file.

For example, if you're working on `manual-multiple`, create `test.json` in the `manual-multiple` directory and populate it as follows:

```
{
    "Title": "My Title",
    "Tone": "brand",
    "NumberOfCards": "4"
}
```

and so on...

Then, to run the server:

```
npm run preview
```

and visit `localhost:7000`, where you can view each ad using the dropdown.

You can modify variables in `test.json` while the server is running, and reload with the refresh button. However, any changes to HTML/JS/CSS will require a rebuild.

**Note:** if the preview section cuts off part of the ad once it's selected, resizing the window or opening the dev tools should cause the page to redraw and fix the problem.

## Testing on Frontend (Local)
If a native component is to make requests to a frontend endpoint, then both preview and frontend will need to be run simultaneously.
This will require you to use:

- the [`portify`](https://github.com/guardian/commercial-templates/blob/master/src/_shared/js/dev.js) method in `src/_shared/js/dev.js` to programmatically switch between 7000 and 9000 when making outbound requests.
- the [`JsonComponent`](https://github.com/guardian/frontend/blob/master/common/app/common/JsonComponent.scala) method to serve the JSON response from the frontend controller. This method wraps the JSON response in a [CORS](https://github.com/guardian/frontend/blob/master/common/app/model/Cors.scala) header which allows cross-origin requests.

## Testing on Frontend (Prod)

There will shortly be an easier way to preview, but for now:

- Create a new Native Style in DFP
- Remember to set the targeting in the Native Style
- Paste in the .html build file and minified CSS
- Create a new order (one order per dev for testing, multiple line items can be associated with 1 order item) with testing advertiser
- Create a line item, using the new Native style creative you've made
- Choose "Sponsorship" with a priority 1, starting immediately
- Key-value pairs for *Slot* (e.g. `merchandising-high`) and *Ad test* cookie (e.g. `native-template-name`)
- Fill in the template variables in your form
- Approve & activate

## Code conventions and pre-commit hooks

This project uses [stylelint](https://github.com/stylelint/). 

To make stylelint list **ALL** errors and warnings, use:

```
npm run stylelint

```

This will report a large amount of warnings until some of the pre-existing sass files are updated.

There is a **pre-commit hook** to enforce fixes to stylelint warnings. When
attempting to commit, pre-commit will run the linter against all staged files. If stylelint reports any warnings or errors, the commit will be prevented from completing and some helpful information will be displayed in the terminal.

To try the validator against your staged files use:

```
npm run pre-commit

```

## Style Sync

The style-sync app is a work-in-progress, bare-bones scala app that compares the formats and styles in DFP to the formats and styles in this repository.

#### Requirements:

To run the app, you will need
- an `ads.properties` file in your home directory that will be used to authenticate calls made with the DFP API (this uses the same credentials required for `frontend` to run); and
- to have run `npm run build` so that the latest source code is being used in comparisons to the state of styles in DFP.

Once the above requirements are met, simply run SBT and execute the `run` task.

#### Development for the future

Ultimately, the aim is to have a self-maintaining process whereby, on each merge to master, each style will compiled and pushed up to DFP (if a change is detected), thus maintaining fidelity between the two sources at all times.

## Useful Info

- DFP variables can be used in JS strings, because the `index.js` file gets minified and attached to the bottom of the page during the build process.
