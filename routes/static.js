'use strict';

// npm packages
var st = require('st')
var EJS = require('ejs');
var fs = require('fs');
var headerPath = __dirname + '/../templates/layout/header.ejs';
var footerPath = __dirname + '/../templates/layout/footer.ejs';
var scriptsPath = __dirname + '/../templates/layout/scripts.ejs';
var cssPath = __dirname + '/../templates/layout/css.ejs';
var headerText = fs.readFileSync(headerPath, 'utf8');
var footerText = fs.readFileSync(footerPath, 'utf8');
var scriptText = fs.readFileSync(scriptsPath, 'utf8');
var cssText = fs.readFileSync(cssPath, 'utf8');
var mount = st({path: process.cwd()+'/www', index: 'index.html', passthrough: true});
var errorHandler = require(__dirname+'/../error-handler.js');

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function (req, res) {
    var htmlPath = '';
    var htmlTemplate = '';
    var html = '';
    var params = {header: headerText, footer: footerText, scripts: scriptText, css: cssText};

    console.log('req.url:'+req.url);

    if (!req.url || endsWith(req.url, ".html")) {
        htmlPath = (req.url === '/') ? '/index.html' : req.url;
        try {
            htmlTemplate = fs.readFileSync(__dirname + '/../www' + htmlPath, 'utf8');

            html = EJS.render(htmlTemplate, {debug:true, data: params});

            res.end(html);
        } catch (err) {
            errorHandler(req, res, err, params);
        }

    } else {
        // serve static resources
        mount(req, res, function() {
            errorHandler(req, res, 404, params);
        })

    }

};
