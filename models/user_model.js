/*var mongo = require('mongodb'),
   Db = mongo.Db,
   Server = mongo.Server;
var server = new Server('localhost', 27017, {
   auto_reconnect: true
   });
var db = new Db('usertest', server);
var onErr = function(err, callback) {
   db.close();
   callback(err);
};
*/
var qs = require('querystring');
var db = require('../config/mongodb');

console.log("user_model called");

exports.checkUser = function(user,password,callback){
	//db.open(function(err, db){
	var collection = db.get().collection("users");
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
//}); //end db.open
};

exports.addUser = function(user,password,callback){
//db.open(function(err, db){
console.log('db opened');
var collection = db.get().collection("users");

console.log('hello');
console.log(user);
console.log(password);

collection.save({"Username":user, "Password":password},{w:1}, callback);

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
        //strJson = '[' + strJson + ']';
        strJson = '{"count":' + intCount + ',"users":[' + strJson + ']' + '}';

        console.log(strJson);
        callback("", JSON.parse(strJson));

        }
        }
        });
//});//end db open

};//end userlist



exports.getAllRecords = function(callback)
{

db.open(function(err, db){
console.log('db opened again');
var collection = db.get().collection("users");
console.log("yoooo");
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
        //strJson = '[' + strJson + ']';
        strJson = '{"count":' + intCount + ',"users":[' + strJson + ']' + '}';

        console.log(strJson);
        callback("", JSON.parse(strJson));

	}
	}
	});
});

};

/*
exports.userlist = function(user,password,callback){
//db.open(function(err, db){
var collection  = db.get().collection('users');
console.log('hello');
console.log(user);
console.log(password);

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
	}
	});
//});//end db open
};//end userlist

*/
