var stripeKey = process.env.STRIPEKEY_TEST || "sk_test_BQokikJOvBiI2HlWgH4olfQ2";
var stripe = require('stripe')(stripeKey);

// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form


exports.chargePostCard = function(stripeToken, amount) {
  var stripeToken = request.body.stripeToken;
  var charge = stripe.charges.create({
    amount: amount * 100, // amount in cents, again
    currency: "usd",
    card: stripeToken,
    description: "PostaaS Postcard Credits"
  }, function(err, charge) {
    if (charge) {
      console.log("charge worked!");
      return charge;
    } else if (err) {
      var result = {};
      result.object = "error";
      result.err = err;
      return result;
    }
  });
}
