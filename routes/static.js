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
var mount = st({path: process.cwd()+'/www', index: 'index.html'});

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function (req, res) {
    var htmlPath = '';
    var htmlTemplate = '';
    var html = '';

    console.log('req.url:'+req.url);

    if (!req.url || endsWith(req.url, ".html")) {
        htmlPath = (req.url === '/') ? '/index.html' : req.url;
        try {
            htmlTemplate = fs.readFileSync(__dirname + '/../www' + htmlPath, 'utf8');

            html = EJS.render(htmlTemplate, {debug:true, data: {header: headerText, footer: footerText, scripts: scriptText, css: cssText}});

            res.end(html);
        } catch (err) {
            res.error(404);
        }

    } else {
        // serve static resources
        if (!mount(req, res)) return res.error(404);

    }

};
