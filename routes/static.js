'use strict';

// npm packages
var st = require('st');
var EJS = require('ejs');
var fs = require('fs');
var captchapng = require('captchapng');
var subscription = require(__dirname+'/subscription.js');
var hint = require(__dirname+'/hint.js');

var headerPath = __dirname + '/../templates/layout/header.ejs';
var footerPath = __dirname + '/../templates/layout/footer.ejs';
var adsPath    = __dirname + '/../templates/layout/ads.ejs';
var scriptsPath = __dirname + '/../templates/layout/scripts.ejs';
var scriptsProdPath = __dirname + '/../templates/layout/scripts-prod.ejs';
var cssPath = __dirname + '/../templates/layout/css.ejs';
var headerText = fs.readFileSync(headerPath, 'utf8');
var footerText = fs.readFileSync(footerPath, 'utf8');
var adsText    = fs.readFileSync(adsPath, 'utf8');
var scriptText = fs.readFileSync(scriptsPath, 'utf8');
var scriptProdText = fs.readFileSync(scriptsProdPath, 'utf8');
var cssText = fs.readFileSync(cssPath, 'utf8');
var mount = st({path: process.cwd()+'/www', index: 'index.html', passthrough: true});
var errorHandler = require(__dirname+'/../error-handler.js');

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function (req, res, config) {
    var htmlPath = '';
    var htmlTemplate = '';
    var html = '';
    var referer = req.headers['referer'] || 'index.html';
    var cacheBust = Math.floor(Math.pow(2,32)*Math.random());
    var adsHtml = EJS.render(adsText, {rdm: cacheBust});
    var params = (config.name === 'prod') ?
                     {header: headerText, footer: footerText, ads: adsHtml, scripts: scriptProdText, css: cssText, referer: referer}
                   : {header: headerText, footer: footerText, ads: adsHtml, scripts: scriptText,     css: cssText, referer: referer};

    //if (config.name === 'development') {
    if (req.url && endsWith(req.url, "?debug=1")) {
        req.url = req.url.replace("?debug=1", "");
        console.log('req.url:'+req.url);
    }

    if (!req.url || (endsWith(req.url, ".html") || req.url === '/')) {

        htmlPath = (req.url === '/') ? '/index.html' : req.url;

        if (htmlPath.indexOf('epona') > -1 && config.name !== 'development') {
            errorHandler(req, res, 'Not allowed');
        } else {
            try {
                htmlTemplate = fs.readFileSync(__dirname + '/../www' + htmlPath, 'utf8');

                html = EJS.render(htmlTemplate, {data: params});

                res.end(html);
            } catch (err) {
                errorHandler(req, res, err, params);
            }
        }
    } else if (req.url.indexOf('/subscription') === 0 && req.headers['referer'].toLowerCase().indexOf('chipscalereview.com') > -1) {
        params.magic = parseInt(Math.random()*9000+1000);
        subscription(req, res, {data: params});
    } else if (req.url.indexOf('/csrhint') === 0) {subscription
        hint(req, res, config);
        res.end();
    } else if (req.url && req.url.indexOf('/captcha.png?') === 0) {
        var magic = 8888;
        try {
            magic = parseInt(req.url.substr(13))
        } catch(er) {
            magic = parseInt(Math.random()*9000+1000);
        }
        var p = new captchapng(80,30,magic); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
    } else{
        // serve static resources
        mount(req, res, function() {
            errorHandler(req, res, 404, params);
        });
    }

};
