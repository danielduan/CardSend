//var lobkey = process.env.LOBKEY_TEST;
var LOB = new (require('lob'))("test_151c1b8b627229d303c3a7fe5e6c6dc05e7");

exports.sendPostCard = function(postcard, res, design, callback) {
  var fronturl = "http://ampaas.herokuapp.com/cards/";
  fronturl += design;
  postcard.front = fronturl;
  LOB.postcards.create(postcard, function(err, response) {
    console.log("sending card");
    if (err) {
      var error = {};
      error.err = err[0].message;
      res.jsonp(error);
      return;
    }
    callback();
    var response = {};
    response.success = "Postcard sent!";
    res.jsonp(response);
  });
}