# Commercial templates

- Templates live in `src`, and current versions can be viewed at commercial/test-page (either on CODE, or when running frontend locally)
- Create a `src/template-name` for the template you're migrating
- Generate `index.html`, `index.scss` and `index.js` following current standards and the specification doc
- Generate build files to test your template by running **`npm run build`**

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
npm run build
npm run build-preview
npm run serve-preview
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
- Paste in the .html build file and minified CSS
- Create a new order (one order per dev for testing, multiple line items can be associated with 1 order item) with testing advertiser
- Create a line item, using the new Native style creative you've made
- Choose "Sponsorship" with a priority 1, starting immediately
- Key-value pairs for *Slot* (e.g. `merchandising-high`) and *Ad test* cookie (e.g. `native-template-name`)
- Fill in the template variables in your form
- Approve & activate

## Useful Info

- DFP variables can be used in JS strings, because the `index.js` file gets minified and attached to the bottom of the page during the build process.
