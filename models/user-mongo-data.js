var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {
  auto_reconnect: true
});
var db = new Db('usertest', server);
var onErr = function(err, callback) {
  db.close();
  callback(err);
};

exports.userlist = function(uid, callback) {
  db.open(function(err, db) {
	var collection  = db.collection('users');
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
//	else{
//	onErr(err,callback);
//	}
		
	} else{
		console.log('No documents found defined criteria.');
	}
        db.close();

});
});

};



