var template = require('../views/template-main');
var mongo_data = require('../models/userlist_model');
exports.get = function(req, res) {


mongo_data.userlist("Albert", function(err, userlist){
console.log('model called after controller');
console.log(userlist);
console.log(userlist.count);

    if (!err) {
      var strUser = "",
        i = 0;
      for (i = 0; i < userlist.count;) {
        strUser = strUser + "<li>" + userlist.users[i].Username + "</li>";
        i = i + 1;
	console.log(strUser);
      }
      strUser = "<ul>" + strUser + "</ul>";
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(template.build("Test web page on node.js", "Hello there", "<p>The Users are:</p>" + strUser));
      res.end();

    }

});
};
