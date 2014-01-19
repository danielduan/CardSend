var Mongoose = require('mongoose');
var mongoUri = process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';
var database = Mongoose.createConnection(mongoUri);

exports.APIKeysSchema = new Mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  card_balance: {
    type: Number,
    required: true
  }
});