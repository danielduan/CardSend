var LOB = new (require('lob'))(process.env.LOBKEY_TEST);

exports.sendPostCard = function(postcard, design) {
  var fronturl = "http://postasaservice.herokuapp.com/cards/front.pdf";
  postcard.front = fronturl;
  console.log("before LOB");
  console.log(postcard);
  LOB.postcards.create(postcard, function(err, res) {
    console.log(err,res);
  });
}