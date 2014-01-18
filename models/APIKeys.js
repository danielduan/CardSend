var Mongoose = require('mongoose');

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