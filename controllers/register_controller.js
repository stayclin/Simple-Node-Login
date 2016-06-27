var mongo_data = require('../models/user_model.js');
console.log("register_controller called");

exports.get = function(req,res){
      //retrieving body content of post request from user input
	var user = req.body.username;
	var password = req.body.password;
	console.log("user entered user: " +user);
	console.log("user entered password: " + password);

mongo_data.addUser(user, password, function(err,item){
	console.log('please add');
	console.dir(item);
	if(item){
    console.log('user was added');
    res.redirect('/profile');
  }
  else{
    console.log('user could not be added. username already exists.');
    res.redirect('/register');
  }
});
};
