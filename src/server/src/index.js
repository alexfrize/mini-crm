var express = require('express');
var api = require('./routes/api');
var bodyParser = require('body-parser');
var app = express();
var port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(api);
app.listen(port);