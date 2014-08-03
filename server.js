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

router.addRoute('/*', require('./routes/static.js'));
router.addRoute('/', require('./routes/home.js'));

http.createServer(function (req, res) {
  res.error = ErrorPage(req, res, {
    404: 'not found!'
  });

  res.template = Templar(req, res, templarOptions);
  router.match(req.url).fn(req, res, config);
}).listen(port);

// log
console.log('Server Listening - http://localhost:' + port + '. ' + environment + ' environment');
