//var lobkey = process.env.LOBKEY_TEST;
var LOB = new (require('lob'))(process.env.LOBKEY_TEST);

exports.sendPostCard = function(postcard, res, design, callback) {
  var fronturl = "http://cardsend.herokuapp.com/cards/";
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
    var resp = {};
    resp.success = "Postcard sent!";
    resp.id = response.id;
    res.jsonp(resp);
  });
}

exports.sendCustomPostCard = function(postcard, res, design, callback) {
  postcard.front = design;
  console.log(postcard);
  LOB.postcards.create(postcard, function(err, response) {
    console.log("sending card");
    if (err) {
      var error = {};
      error.err = err[0].message;
      res.jsonp(error);
      return;
    }
    callback();
    var resp = {};
    resp.success = "Postcard sent!";
    resp.id = response.id;
    res.jsonp(resp.success);
  });
}