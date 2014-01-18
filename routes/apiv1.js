var apicontroller = require("../controllers/APIController");

exports.cardbalance = function(req, res) {
  var key = req.params.key;
  console.log('Retrieving key: ' + key);
  res.send(apicontroller.getCardBalance(key));
}