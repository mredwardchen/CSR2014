'use strict';

module.exports = subscription;

// getting our contacts from the 'database' - contacts.json

function subscription (req, res, config) {

    var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME || 'w7y2ublh', process.env.SENDGRID_PASSWORD || 'app28001807@heroku.com');
    sendgrid.send({
        to:       ['feisajan@yahoo.com','mredwardchen@hotmail.com'],
        from:     'csr2014@xinnamonj.com',
        subject:  'Mail test',
        text:     'My first email through SendGrid.'
    }, function(err, json) {
        if (err) { console.error(err); }
        console.log(json);
        res.template('subscription.ejs', {result: json});
    });

};
