var Mongoose = require('mongoose');
var mongoUri = process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';
var db = Mongoose.createConnection(mongoUri);

//stores api keys
var APIKeysSchema = require('../models/APIKeys.js').APIKeysSchema;
var APIKeys = db.model('apikeys', APIKeysSchema);

exports.getCardBalance = function(key) {
  db.collection('apikeys', function(err, api) {
    api.findOne({'key':key}, 'card_balance', function(err, api) {
        console.log("balance of " + apikey + ": balance " + api.card_balance);
        return api.card_balance;
    });
  });
}