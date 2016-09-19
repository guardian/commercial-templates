# Commercial templates

- Templates live in `src`, and current versions can be viewed at commercial/test-page
- Create a `src/template-name` for the template you're migrating
- Generate `index.html`, `index.scss` and `index.js` following current standards and the specification doc
- Generate build files to test your template by running **`npm run build`**

## Testing

There will shortly be an easier way to preview, but for now:

- Create a new Native Style in DFP
- Paste in the .html build file and minified CSS
- Create a new order (one order per dev for testing, multiple line items can be associated with 1 order item) with testing advertiser
- Create a line item, using the new Native style creative you've made
- Choose "Sponsorship" with a priority 1, starting immediately
- Key-value pairs for *Slot* (e.g. `merchandising-high`) and *Ad test* cookie (e.g. `native-template-name`)
- Fill in the template variables in your form
- Approve & activate
