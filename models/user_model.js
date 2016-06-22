var mongo = require('mongodb'), 
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

var qs = require('querystring');


console.log("user_model called");

exports.userlist = function(user,password,callback){


db.open(function(err, db){
console.log('db opened');

var collection = db.collection("users");


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
	 strJson += '{"Username":"' + docs[i].User + '", "Password":"'+docs[i].Password + '"}';
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
});//end db open

};//end userlist


exports.checkUser = function(user,password,callback){
	db.open(function(err, db){
	var collection = db.collection("users");
	console.log("user entered: " + user);
	collection.findOne({"User": user}, function(err, item){
	console.log(item);
	var redirect='';
	//check if user exists
	if(item){
	   console.log("user: "+item.User+" found!");

	   var userdb = item.User;
	   var passworddb = item.Password;
	   console.log("db user: "+userdb);
	   console.log("db pass: "+passworddb);
	   console.log("user entered password: " + password);
	   if(passworddb == password){
	      console.log("correct password!");
	      //redirect=true;
	      //console.log("redirect: " +redirect);
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
});
};

exports.addUser = function(user,password,callback){


db.open(function(err, db){
console.log('db opened');

var collection = db.collection("users");


console.log('hello');
console.log(user);
console.log(password);

collection.save({User:"Kim", Password:"Lima"},{w:1}, callback);


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
         strJson += '{"Username":"' + docs[i].User + '", "Password":"'+docs[i].Password + '"}';
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
});//end db open

};//end userlist



exports.getAllRecords = function(callback)
{

db.open(function(err, db){
console.log('db opened again');
var collection = db.collection("users");
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
         strJson += '{"Username":"' + docs[i].User + '", "Password":"'+docs[i].Password + '"}';
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
