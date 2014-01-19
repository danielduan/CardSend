var apikeysmodel = require('../models/APIKeysModel.js');

exports.getCardBalance = function(key) {
  // db.collection('apikeys', function(err, api) {
  //   api.findOne({'key':key}, 'card_balance', function(err, api) {
  //       console.log("balance of " + apikey + ": balance " + api.card_balance);
  //       return api.card_balance;
  //   });
  // });
}

exports.makeAPIKey = function() {
  var key = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 16; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  apikeysmodel.addNewKey(key);
  //still need to check if key exists, highly doubt it
  return key;
}

exports.addCredits = function(apikey, credits) {
  apikeysmodel.addCardCredit(apikey, credits);
//   db.findOne({key: apikey }, function (err, account) {
//   account.card_balance += credits;
//   account.save(callback);
// });
}