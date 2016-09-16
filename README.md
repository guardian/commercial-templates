# commercial-templates
Placeholder description: @regiskuckaertz created this with repo-genesis

- Templates live in source, and currect versions can be viewed at commercial/test-page
- Create a src/template-name for the template you're migrating
- Generate .html, .scss and .js following current standards and the specification doc
- Generate build files to test your template by running <b>npm run build</b>

## Testing

There will shortly be an easier way to preview, but for now:

- Create a new Creative in DFP, Native style
- Paste in the .html build file and minified CSS
- Create a new order item (one order item per dev for testing, multiple line items can be associated with 1 order item) with testing advertiser
- Create a relevant line order item, using the new Native style creative you've made
- Choose sponsorship with a priority 1, starting immediately
- Key-value pairs for Slot (merchandising-high) and Ad test cookie (phrase of your choice)
- Fill in the template variables in your form
- Approve & activate
