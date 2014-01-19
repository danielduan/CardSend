var sendgridcontroller = require("../controllers/SendGridController.js");
var apicontroller = require("../controllers/APIController");

var stripeKey = process.env.STRIPEKEY_TEST || "sk_test_BQokikJOvBiI2HlWgH4olfQ2";
var stripe = require('stripe')(stripeKey);

exports.chargePostCard = function(req, res) {
  var charge = req.body;
  var apikey = charge.apikey;
  var email = charge.email;
  charge.amount = parseInt(charge.amount);
  if (charge.amount > 100) {
    res.jsonp("Please contact us for orders more than 100 postcards. Thanks.");
    return;
  }

  //create charge to LOB
  var chargestripe = stripe.charges.create({
    amount: charge.amount * 100, // amount in cents, again
    currency: "usd",
    card: charge.token,
    description: "PostaaS Order " + apikey,
  }, function(err, charge) {
    if (charge) {
      //no apikey, generate one
      if (!apikey || apikey == "") {
        apikey = apicontroller.makeAPIKey();
      }

      var cards = 0;
      charge.amount = charge.amount / 100;
      //count how many credits
      if (charge.amount < 5) {
        cards = 0;
      } else if (charge.amount >= 5 && < 8) {
        cards = 1;
      } else if (charge.amount >= 8 && < 16) {
        cards = 2;
      } else if (charge.amount == 16) {
        cards = 5;
      } else {
        cards = charge.amount / 3;
      }

      //update mongo & send email
      apicontroller.addCredits(apikey, cards);
      sendgridcontroller.sendChargeConfirmation(email, apikey, cards, charge.amount);

      //send response back
      var response = "Transaction for " + cards + " credits is successful. ";
      response += "You Order ID is " + apikey + ". ";
      response += "You are now ready to design your postcards.";
      res.jsonp(response);
    } else if (err) {
      res.jsonp(err.message);
    }
  });
}