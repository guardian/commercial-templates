require("babel-core/register");

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const templates = require('./src/js/lib/templates');
const template = require('./src/js/lib/template');

app.set('port', (process.env.PORT || 9000));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', express.static(path.join(__dirname, '/public')));

app.get("/templates", (req, res, next) => {
	res.send(templates());
});

app.get("/template", (req, res, next) => {
	res.send("please select template to preview");
});

app.get("/template/:id", (req, res, next) => {
	template(req.params.id)
	.then(html => {
		res.send(html);
	})
	.catch(next)
});

app.listen(app.get('port'), () => {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

app.use((err, req, res, next) => {
  res.send(err.message);
});