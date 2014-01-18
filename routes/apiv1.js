var apicontroller = require("../controllers/APIController");
var lobcontroller = require("../controllers/LobController");

gets remaining postcards
/api/v1/card/balance?key=_APIKEY_
exports.cardbalance = function(req, res) {
  var key = req.params.key;
  console.log('Retrieving key: ' + key);
  var response = {
    "key": key,
    "remaining postcards": apicontroller.getCardBalance(key)
  };
  response = JSON.stringify(response);
  res.send(response);
}

// exports.cardbalance = function(req, res) {
//   var key = req.params.key;
//   //console.log('Retrieving key: ' + key);
//   var response = {
//     "key": key,
//     "body": req.body
//     //"remaining postcards": apicontroller.getCardBalance(key)
//   };
//   response = JSON.stringify(response);
//   res.send(response);
// }

// charges for additional postcards
// /api/v1/card/charge?key=_APIKEY
exports.chargecardbalance = function(req, res) {

}

// send postcards
// /api/v1/card/send?key=_APIKEY
// to_name, to_address1, to_address2, to_city, to_state, to_zip, to_country,
// from_name, from_address1, from_address2, from_city, from_state,
// from_zip, from_country,
// card_design, message,
exports.sendcard = function(req, res) {
  var cardinfo = {
    to: {
      name: req.body.to_name,
      address_line1: req.body.to_address1,
      address_line2: req.body.to_address2,
      address_city: req.body.to_city,
      address_state: req.body.to_state,
      address_zip: req.body.to_zip,
      address_country: req.body.to_country
    },
    from: {
      name: req.body.from_name,
      address_line1: req.body.from_address1,
      address_line2: req.body.from_address2,
      address_city: req.body.from_city,
      address_state: req.body.from_state,
      address_zip: req.body.from_zip,
      address_country: req.body.from_country
    },
    message: req.body.message
  };
  var response = lobcontroller.sendPostCard(cardinfo, req.body.card_design);
  response = JSON.stringify(response);
  res.send(response);
}