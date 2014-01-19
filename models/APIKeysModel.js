var Mongoose = require('mongoose');

var db = Mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

var mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';
Mongoose.connect(mongoUri);

var APIKeysSchema = new Mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  card_balance: {
    type: Number,
    required: true
  }
});

var APIKey = Mongoose.model('APIKeys', APIKeysSchema);

exports.addNewKey = function(key) {
  var apikey = new APIKey({
    key: key,
    card_balance: 0,
  });
  apikey.save(function(err, apikey) {
    if (err) {
      return console.log(err);
    }
    //console.log(apikey);
  })
}

exports.addCardCredit = function(key, credits) {
  APIKey.findOne({key:key}, function (err, apikey) {
    if (err) {
      return console.log(err);
    }
    //console.log(apikey);
    apikey.card_balance += credits;
    apikey.save(function(err, apikey) {
      if (err) {
        return console.log(err);
      }
      //console.log(apikey);
    });
  });
}

exports.getCredits = function(key) {
  APIKey.findOne({key:key}, function (err, apikey) {
    if (err) {
      return console.log(err);
    }
    return apikey.card_balance;
  });
}

exports.useCredits = function(key, credits) {
  APIKey.findOne({key:key}, function (err, apikey) {
    if (err) {
      return console.log(err);
    }
    //console.log(apikey);
    apikey.card_balance -= apikey;
    apikey.save(function(err, apikey) {
      if (err) {
        return console.log(err);
      }
      //console.log(apikey);
    });
  });
}




