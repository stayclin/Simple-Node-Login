var mongo_data = require('../models/user_model.js');
console.log("user_controller called");

exports.get = function(req,res){
      //retrieving body content of post request from user input
	var user = req.body.username;
	var password = req.body.password;
	console.log("user entered user: " +user);
	console.log("user entered password: " + password);

/*
mongo_data.userlist(user,password,function(err,userlist){
	console.log('userlistttt');
//	console.log(userlist);
	console.log("user count: "+userlist.count);

});
*/
/*
mongo_data.getAllRecords(function(err,getAllRecords){
	console.log('testtinnnggg');
});
*/

mongo_data.checkUser(user, password, function(err,item){
	console.log('checckkk');
	//console.log("check user: "+checkUser.redirect);
	console.dir(item);
	//console.log(item.User);
	if(item){
           console.log(item.User);
	   console.log('user authenticated');
           res.redirect('/profile');
        }
        else{
           console.log('user failed');
	//res.send(500,'showAlert')
           res.redirect('/login');
        }
});

/*
mongo_data.addUser(user, password, function(err,addUser){
	console.log('gooo');

});
*/

};

