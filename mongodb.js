var MongoClient = require('mongodb').MongoClient;

var state = {
  db: null,
};

exports.connect = function(url, callback) {
  if (state.db) return callback()

  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err)
    state.db = db
    callback()
  });
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      callback(err)
    });
  }
}

/*
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/usertest'
// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);

      // do some work here with the database.

      //Close connection
      db.close();
  }
  */
