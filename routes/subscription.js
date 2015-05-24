'use strict';

module.exports = subscription;

var queryString = require('querystring');
var EJS = require('ejs');
var fs = require('fs');
var path = __dirname + '/../templates/subscription/noticeEmail.ejs';
var emailTemplate = fs.readFileSync(path, 'utf8');

function subscription (req, res, config) {
    var params = [
        {'title': 'Edition', 'key': 'F_04'},
        {'title': 'First Name', 'key': 'a_first_name'},
        {'title': 'Last Name', 'key': 'a_last_name'},
        {'title': 'Title', 'key': 'a_title'},
        {'title': 'Company', 'key': 'a_company'},
        {'title': 'Address', 'key': 'a_address_1'},
        {'title': '', 'key': 'a_address_2'},
        {'title': 'City', 'key': 'a_city'},
        {'title': 'State', 'key': 'a_state'},
        {'title': 'Zip/Postal Code', 'key': 'a_zip'},
        {'title': 'Country', 'key': 'a_country'},
        {'title': 'Email', 'key': 'a_email'},
        {'title': 'Phone', 'key': 'a_phone'},
        {'title': 'Fax', 'key': 'a_fax'},
        {'title': '01. Assembly of IC Packages', 'key': 'F_03'},
        {'title': '02. Primary Industry:', 'key': 'F_14'},
        {'title': '02. Primary Industry(other)', 'key': 'F_14_OTHER'},
        {'title': '03. Primary Job Function', 'key': 'F_15'},
        {'title': '03. Primary Job Function(other)', 'key': 'F_15_OTHER'},
        {'title': '04. What products do you buy/sell?', 'key': 'F_17[]'},
        {'title': '05. Number of Employees', 'key': 'F_06'},
        {'title': '06. Please indicate Month of Birth', 'key': 'F_07'},
        {'title': '07. May we contact you by email about your subscription?', 'key': 'F_08'}
    ];
    params.header = config.data.header;
    params.footer = config.data.footer;
    params.scripts = config.data.scripts;
    params.css = config.data.css;


    function processParams(p) {
        // update values from form to key array
        for (var i=0; i<params.length; i++) {
            params[i].value = p[params[i].key] || '';
        }
    }

    function spamCheck() {
        if (params[0] && params[0].value === '') {
            return true;
        }

        // explicit country check
        if (params[10] && params[10].value === '1') {
            return true;
        }

        for (var i=1; i<14; i++) {
            if (params[i] && params[i].value === '1') {
                return true;
            }
        }

        return false;
    }

    function toEmailBody(p) {
        var data = params || p;
        var text = EJS.render(emailTemplate, {data: data, debug: false, filename: path});
        return text;
    }

    function handleForm (req, res) {
        var chunk='';
        req.on('error', function() {
           console.log('error receiving form data');
        });
        req.on('end', function() {
            //console.log('there will be no more data.');
        });
        req.on('readable', function() {
            while (null !== (chunk = req.read())) {
                //console.log('got %d bytes of data. data==> %s', chunk.length, chunk);
                var p = queryString.parse(chunk.toString());
                processParams(p);
                var isSpam = spamCheck();
                var to = isSpam ? ['ed@xinnamonj.com'] : ['subs@chipscalereview.com', 'ed@xinnamonj.com'];
                var subject = isSpam ? '[Possible Spam] New CSR Subscription' : 'New CSR Subscription';
                var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME || 'ed@xinnamonj.com', process.env.SENDGRID_PASSWORD || 'qq12345@QQ.com');
                if (isSpam) {
                    console.log('[Possible Spam]: %s', toEmailBody(params));
                    res.template('subscription/feedback.ejs', {'data': params});
                } else {
                    sendgrid.send({
                        to:       to,
                        from:     'subs@chipscalereview.com',
                        subject:  subject,
                        text:     toEmailBody(params)
                    }, function(err, json) {
                        if (err) { console.error('Error:'+err);
                        } else {
                            res.template('subscription/feedback.ejs', {'data': params});
                        }
                    });
                }
            }
        });
    }

    switch (req.method) {
        case 'POST':
            handleForm(req, res);
            break;

        case 'GET':
            res.template('subscription/signup.ejs', config);

    }
};
