var sendgridcontroller = require("../controllers/SendGridController.js");
var apicontroller = require("../controllers/APIController");

var stripeKey = process.env.STRIPEKEY_TEST || "sk_test_BQokikJOvBiI2HlWgH4olfQ2";
var stripe = require('stripe')(stripeKey);

// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form

exports.chargePostCard = function(req, res) {
  var charge = req.body;
  var apikey = charge.apikey;
  var email = charge.email;
  charge.amount = parseInt(charge.amount);

  //no apikey, generate one
  if (!apikey || apikey == "") {
    apikey = apicontroller.makeAPIKey();
  }

  //create charge to LOB
  var chargestripe = stripe.charges.create({
    amount: charge.amount * 100, // amount in cents, again
    currency: "usd",
    card: charge.token,
    description: "PostaaS Order " + apikey,
  }, function(err, charge) {
    if (charge) {
      var cards = 0;
      charge.amount = charge.amount / 100;
      //count how many credits
      if (charge.amount <= 5) {
        cards = 1;
      } else if (charge.amount <= 8) {
        cards = 2;
      } else if (charge.amount <= 16) {
        cards = 5;
      } else {
        cards = charge.amount / 3;
      }
      //send response
      apicontroller.addCredits(apikey,cards);
      sendgridcontroller.sendChargeConfirmation(email, apikey, cards, charge.amount);

      var response = "Transaction for " + cards + " credits is successful. ";
      response += "You Order ID is " + apikey + ".";
      res.jsonp(response);
    } else if (err) {
      res.jsonp(err.message);
    }
  });
}