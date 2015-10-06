// usage
// node server.js

process.title = 'csr2014-website-development';

require('newrelic');

// core module
var http = require('http');
var domain = require('domain');

// npm packages
var Templar = require('templar');
var router = require('routes')();
var errorHandler = require('./error-handler.js');

var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');
var templarOptions = { engine: config.engine, folder: config.templates };
var port = process.env.PORT || config.port;

var serverDomain = domain.create();

serverDomain.on('error', function(er){
    console.error('server error', er.stack);
});

serverDomain.run(function(){
    Templar.loadFolder(config.templates);

//router.addRoute('/subscription', require('./routes/subscription.js'));
    router.addRoute('*', require('./routes/static.js'));

    http.createServer(function (req, res) {
        try {
            var d = domain.create();
            d.on('error', function(er) {
                console.error('req error', er.stack);
                try {
                    errorHandler(req, res, 'Error!');
                } catch(er2) {
                    console.error('Request Error: handling request error!', er2.stack);
                }
            });
            d.add(req);
            d.add(res);
            d.run(function(){
                res.template = Templar(req, res, templarOptions);
                var route = router.match(req.url);

                if (route) {
                    route.fn(req, res, config);
                } else {
                    console.log('No routes found: req.url:'+req.url);
                    errorHandler(req, res, 'No routes found!');
                }
            });
        } catch(err) {
            console.log('Error: req.url:'+req.url);
            errorHandler(req, res, 'No routes found!');
        }
    }).listen(port);
});


// log
console.log('Server Listening - http://localhost:' + port + '. ' + environment + ' environment');
