var PDFDocument = require('pdfkit');
var fs = require('fs');

exports.createDocument = function(req, res) {
  
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  var image = "../tmp/" + text + ".jpg";

  fs.writeFile(image, new Buffer(req.body.image, "base64"), function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
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