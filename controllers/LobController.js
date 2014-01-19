//var lobkey = process.env.LOBKEY_TEST;
var LOB = new (require('lob'))("test_151c1b8b627229d303c3a7fe5e6c6dc05e7");

exports.sendPostCard = function(postcard, res, design) {
  var fronturl = "http://postasaservice.herokuapp.com/cards/";
  fronturl += design;
  postcard.front = fronturl;
  LOB.postcards.create(postcard, function(err, response) {
    if (err) {
      res.jsonp(err);
    } else {
      res.jsonp(res);
    }
  });
}