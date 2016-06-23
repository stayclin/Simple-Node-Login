var http_ip = 'localhost';
var http_port = 3000;
var http = require ('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./router')(app);

/*
//start server
server.listen(http_port, function(){
console.log('listening to http://' + http_ip + ':' + http_port);
});
*/

// Connect to Mongo on start
var db = require('./config/mongodb');
db.connect('mongodb://localhost:27017/usertest', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})
