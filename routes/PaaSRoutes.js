var stripecontroller = require("../controllers/StripeController");

// charges for additional postcards
// /api/v1/card/charge?key=_APIKEY
// 
// token - stripe card token
// amount - stripe charge amount
// apikey - api key
exports.chargecardbalance = function(req, res) {
  stripecontroller.chargePostCard(req, res);
}

