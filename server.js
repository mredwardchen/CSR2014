// usage
// node server.js

process.title = 'csr2014-website';

// core module
var http = require('http');

// npm packages
var ErrorPage = require('error-page');
var Templar = require('templar');
var router = require('routes')();

var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');
var templarOptions = { engine: config.engine, folder: config.templates };
var port = process.env.PORT || config.port;

Templar.loadFolder(config.templates);

router.addRoute('/subscription', require('./routes/subscription.js'));
router.addRoute('*', require('./routes/static.js'));

http.createServer(function (req, res) {
  res.error = ErrorPage(req, res, {
    404: 'not found!'
  });

  res.template = Templar(req, res, templarOptions);

  var route = router.match(req.url);
  if (route) {
    route.fn(req, res, config);
  } else {
    console.log('No route found');
    res.error(404);
  }
}).listen(port);

// log
console.log('Server Listening - http://localhost:' + port + '. ' + environment + ' environment');
