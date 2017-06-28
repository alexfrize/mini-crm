var express = require('express');
var api = require('./routes/api');
var app = express();
var port = 3001;

app.use(api);
app.listen(port);