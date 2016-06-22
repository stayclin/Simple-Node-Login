var http_ip = '45.63.12.123';
var http_port = 3000;
var http = require ('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./router')(app);

//start server
server.listen(http_port, function(){
console.log('listening to http://' + http_ip + ':' + http_port);
});
