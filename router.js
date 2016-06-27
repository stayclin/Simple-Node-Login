var url = require('url');
var fs = require('fs');
var http = require('http');

module.exports = function(app){

   app.get('/', function(req, res){
      res.send('Hello stacy');
   });
   app.get('/users', function(req, res){
      require('./controllers/userlist_controller').get(req,res);
   });
   app.get('/login', function(req,res){
      res.sendFile(__dirname + '/views/login.html');
   });
   app.post('/login', function(req,res){
      console.log('login post method called');
      console.log("user name: " +req.body.username + ", password: "+req.body.password);
      require('./controllers/user_controller').get(req,res);
   });
   app.get('/register', function(req,res){
      res.sendFile(__dirname + '/views/register.html');
   });
   app.post('/register', function(req,res){
     console.log('register post method called');
     console.log("user name: " +req.body.username + ", password: "+req.body.password);
     require('./controllers/register_controller').get(req,res);

   });
   app.get('/profile', function(req,res){
      res.sendFile(__dirname + '/views/profile.html');
   });

};
