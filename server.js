// usage
// node server.js

process.title = 'csr2014-website';

// core module
var http = require('http');

// npm packages
var Templar = require('templar');
var router = require('routes')();
var errorHandler = require('./error-handler.js');

var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');
var templarOptions = { engine: config.engine, folder: config.templates };
var port = process.env.PORT || config.port;

Templar.loadFolder(config.templates);

//router.addRoute('/subscription', require('./routes/subscription.js'));
router.addRoute('*', require('./routes/static.js'));


http.createServer(function (req, res) {

  res.template = Templar(req, res, templarOptions);

  var route = router.match(req.url);

  if (route) {
    route.fn(req, res, config);
  } else {
    errorHandler(req, res, 'No routes found!');
  }
}).listen(port);

// log
console.log('Server Listening - http://localhost:' + port + '. ' + environment + ' environment');
