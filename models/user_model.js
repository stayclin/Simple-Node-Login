var qs = require('querystring');
var db = require('../config/mongodb');

console.log("user_model called");
var collection = db.get().collection("users");

exports.checkUser = function(user,password,callback){
	console.log("user entered: " + user);
	collection.findOne({"Username": user}, function(err, item){
	console.log('item: '+item);
	//check if user exists
	if(item){
	   console.log("user: "+item.Username+" found!");

	   var userdb = item.Username;
	   var passworddb = item.Password;
	   console.log("db user: "+userdb);
	   console.log("db pass: "+passworddb);
	   console.log("user entered password: " + password);
	   if(passworddb == password){
	      console.log("correct password!");
	      callback(null,item);
	   }
	   else{
	      console.log("incorrect password!");
	      callback('invalid-password');
	   }
	}
	else{
	      console.log("user does not exist");
	      callback('user-not-found');
	}
	});
};

exports.addUser = function(user,password,callback){

console.log('hello');
console.log(user);
console.log(password);

collection.findOne({"Username": user}, function(err, item){
console.log("found one");
if(item){
	console.log("username already exists.");
}
else{
	collection.save({"Username":user, "Password":password},{w:1}, callback);
	console.log('user added');
}
});
};//end adduser

exports.userlist = function(username, callback) {
	collection.find().toArray(function(err, docs){
	if(err){
	console.log(err);
	} else if (docs.length){
	console.log('Found:', docs);

		var intCount = docs.length;
		console.log('User Count: ' +intCount);

	if(intCount>0){
	  var strJson = "";
	for (var i=0; i<intCount;){
	 strJson += '{"Username":"' + docs[i].Username + '", "Password":"'+docs[i].Password + '"}';
	 console.log(strJson);
	 i=i+1;
	 if(i<intCount){
	 strJson += ',';
     	 }
	}
  strJson = '{"count":' + intCount + ',"users":[' + strJson + ']' + '}';

	console.log(strJson);
	callback("", JSON.parse(strJson));
	}

	} else{
		console.log('No documents found defined criteria.');
	}

});

};
