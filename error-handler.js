'use strict';

var EJS = require('ejs');
var fs = require('fs');

var errorTemplatePath = __dirname + '/templates/error/template.ejs';
var errorTemplateLightPath = __dirname + '/templates/error/template-light.ejs';
var errorTemplate = fs.readFileSync(errorTemplatePath, 'utf8');
var errorLightTemplate = fs.readFileSync(errorTemplateLightPath, 'utf8');

module.exports = function (req, res, arg, params) {
    var html = '';
    var code = 404;
    var mesg = '';
    var er = {message:''};

    switch (typeof arg) {
        case 'number':
            code = arg;
            break;

        case 'string':
            mesg = arg;
            break;

        case 'object':
            if (arg instanceof Error) {
                er = arg;
                mesg = er.message;
            }
            break;
    }

    if (params) {
        html = EJS.render(errorTemplate, {debug:false, url: req.url, data: params});
    } else {
        html = EJS.render(errorLightTemplate, {debug:false, url: req.url});
    }

    res.end(html);

}