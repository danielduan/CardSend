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

exports.sendEmailCard = function(email, to_name, from_name, pdf, mess, res){
  var message = "Hi " + to_name + "! Here is your postcard: " + pdf;
  message += "\n";
  message += mess;
  message += "\n -" + from_name;

  sendgrid.send({
    to: email,
    from: 'order@postacard.herokuapp.com',
    subject: 'PostaCard',
    text: message
  }, function(err, json) {
  if (err) { return console.error(err); }
    console.log(json);
  });
  var response = {};
    response.success = "Email sent!";
    res.jsonp(response.success);
};