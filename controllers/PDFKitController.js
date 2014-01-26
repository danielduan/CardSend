var PDFDocument = require('pdfkit');
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

  console.log(text);

  var doc = new PDFDocument();
  doc.addPage({
    size: [432,288],
    layout: 'landscape'
  });

  var incomingreq = "";

  var bufs = [];
  req.on('data', function(d){
    bufs.push(d);
  });
  req.on('end', function(){
    var buf = Buffer.concat(bufs);
    var s3bucket = new AWS.S3({params: {Bucket: 'postacard-heroku'}});
    doc.image((buf.image, "base64"), 100, 100).text('Full size', 100, 85);
    doc.output(function(string) {
      s3bucket.createBucket(function() {
        var data = {Key: text + ".pdf", ACL:"public-read" , Body: string};
        s3bucket.putObject(data, function(err, data) {
          if (err) {
            console.log("Error uploading data: ", err);
          } else {
            console.log("Successfully uploaded pdf to myBucket/myKey");

            var pdfurl = "http://s3-us-west-2.amazonaws.com/postacard-heroku/" + text + ".pdf";
            res.jsonp({pdf:pdfurl});
          }
        });
      });
    });
  });
}