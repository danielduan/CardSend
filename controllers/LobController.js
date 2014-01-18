var LOB = new (require('lob'))(process.env.LOBKEY_TEST);

exports.sendPostCard = function(postcard, design) {
  var fronturl = "@public/cards/front.pdf";
  postcard.front = fronturl;
  LOB.postcards.create(postcard, function(err, res) {
    console.log(err,res);
  });
}