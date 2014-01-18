//var lobkey = process.env.LOBKEY_TEST;
var LOB = new (require('lob'))("test_151c1b8b627229d303c3a7fe5e6c6dc05e7");

exports.sendPostCard = function(postcard, design) {
  var fronturl = "http://postasaservice.herokuapp.com/cards/front.pdf";
  postcard.front = fronturl;
  LOB.postcards.create(postcard, function(err, res) {
    return res;
  });
}