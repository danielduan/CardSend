var PDFDocument = require('pdfkit');
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
AWS.config.update({accessKeyId: process.env.AWS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_KEY });

exports.createDocument = function(req, res) {
  
  //generate file name
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }



  //var image = "../tmp/" + text + ".png";
  //var image = "../tmp/" + text + ".png";

  console.log(image);

  // fs.writeFile(image, new Buffer(req.body.image, "base64"), function (err) {
  //   if (err) throw err;
  //   console.log('It\'s saved!');
  // });

  var s3bucket = new AWS.S3({params: {Bucket: 'postacard-heroku'}});
  s3bucket.createBucket(function() {
    var data = {Key: text + ".jpg", Body: new Buffer(req.body.image, "base64")};
    s3bucket.putObject(data, function(err, data) {
      if (err) {
        console.log("Error uploading data: ", err);
      } else {
        console.log("Successfully uploaded data to myBucket/myKey");
      }
    });
  });


  var doc = new PDFDocument();
  doc.addPage({
    size: [432,288],
    layout: 'landscape'
  });

  doc.image(image, 100, 100).text('Full size', 100, 85);

  var file = "../tmp/" + text + ".pdf";

  doc.write(file);
  res.jsonp({pdf:file});
}