require("babel-core/register");

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const templates = require('./lib/templates');
// const template = require('./lib/template');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', express.static(path.join(__dirname, 'preview/public')));

app.get("/templates", (req, res, next) => {
	res.send(templates());
});

// app.get("/template/:id", (req, res, next) => {
// 	template(req.params.id)
// 	.then(html => {
// 		res.send(html);
// 	})
// 	.catch(next)
// });

app.listen(app.get('port'), () => {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

app.use((err, req, res, next) => {
  res.send(err.message);
});