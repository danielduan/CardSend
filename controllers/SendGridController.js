var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME,
  process.env.SENDGRID_PASSWORD);

exports.sendChargeConfirmation = function(email, key, credits, price){
  var message = "Thank you for your recent purchase.\n";
  message += "Your recent order of " + credits + " for $" + price;
  message += " has been added to your API key: ";
  message += key;

  sendgrid.send({
    to: email,
    from: 'order@cardsend.herokuapp.com',
    subject: 'CardSend Order Confirmation',
    text: message
  }, function(err, json) {
  if (err) { return console.error(err); }
    console.log(json);
  });

};

exports.sendEmailCard = function(email, to_name, to_name, res){
  var message = "Hi " + to_name + "! Here is your postcard. -" + from_name;

  sendgrid.send({
    to: email,
    from: 'order@postacard.herokuapp.com',
    subject: 'PostaCard Order Confirmation',
    text: message
  }, function(err, json) {
  if (err) { return console.error(err); }
    console.log(json);
  });
  var response = {};
    response.success = "Postcard sent!";
    res.jsonp(response);
};