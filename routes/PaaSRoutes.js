var apicontroller = require("../controllers/APIController");
var stripecontroller = require("../controllers/StripeController");

// charges for additional postcards
// /api/v1/card/charge?key=_APIKEY
// 
// token - stripe card token
// amount - stripe charge amount
// apikey - api key
exports.chargecardbalance = function(req, res) {
  var charge = req.body;
  var apikey = charge.apikey;
  if (!apikey) {
    apikey = apicontroller.makeAPIKey();
    console.log(apikey);
  }
  var result = stripecontroller.chargePostCard(charge.token, charge.amount);
  console.log(result);
  if (result.object === "charge") {
    if (charge.amount <= 5) {
      //add 1 credit
      console.log('1 credit');
    } else if (charge.amount <= 8) {
      //add 2 credit
      console.log('2 credit');
    } else if (charge.amount <= 16) {
      //add 5 credit
      console.log('5 credit');
    } else {
      //add n credits
      var credits = charge.amount / 3;
      console.log(credits);
    }
    res.send("success");
    //charge successful

  } else if (result.object === "error") {
    switch (result.err.type) {
      case 'StripeCardError':
        // A declined card error
        console.log(result.err.message); // => e.g. "Your card's expiration year is invalid."
        break;
      case 'StripeInvalidRequestError':
        // Invalid parameters were supplied to Stripe's API
        console.log("invalid request");
        break;
      default:
        // An error occurred internally with Stripe's API
        console.log("server error");
        break;
    }
    res.send("fail");
  }

}