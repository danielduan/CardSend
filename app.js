var express = require('express')
  , APIv1Routes = require('./routes/APIv1Routes.js')
  , PaaSRoutes = require('./routes/PaaSRoutes.js')
  , MobileRoutes = require('./routes/MobileRoutes.js')
  , http = require('http')
  , path = require('path');

var app = express();

var Mongoose = require('mongoose');
var mongoUri = process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';
var db = Mongoose.createConnection(mongoUri);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(allowCrossDomain);
app.use(app.router);
app.use(express.limit('5mb'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'tmp')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//card send v1
app.get('/api/v1/card/balance', APIv1Routes.cardbalance);
app.post('/api/v1/card/send', APIv1Routes.sendcard);

app.post('/mobile/v1/card/send', MobileRoutes.sendcard);
app.post('/mobile/v1/email/send', MobileRoutes.sendemail);
app.post('/mobile/v1/pdf', MobileRoutes.createPDF);

app.post('/paas/recharge', PaaSRoutes.chargecardbalance);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});