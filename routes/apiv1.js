var apicontroller = require("../controllers/APIController");
var lobcontroller = require("../controllers/LobController");

// gets remaining postcards
// /api/v1/card/balance?key=_APIKEY_
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
  var addresses = req.body;
  var cardinfo = {
    to: {
      name: to_name,
      address_line1: to_address1,
      address_line2: to_address2,
      address_city: to_city,
      address_state: to_state,
      address_zip: to_zip,
      address_country: to_country
    },
    from: {
      name: from_name,
      address_line1: from_address1,
      address_line2: from_address2,
      address_city: from_city,
      address_state: from_state,
      address_zip: from_zip,
      address_country: from_country
    },
    message: message
  };
  lobcontroller.sendPostCard(cardinfo, card_design);
}