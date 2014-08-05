'use strict';

module.exports = subscription;

// getting our contacts from the 'database' - contacts.json

function subscription (req, res, config) {

    function handleForm (req, res) {
        var chunk='';
        req.on('error', function() {
           console.log('error');
        });
        req.on('end', function() {
            console.log('there will be no more data.');
        });
        req.on('readable', function() {
            while (null !== (chunk = req.read())) {
                console.log('got %d bytes of data. data==> %s', chunk.length, chunk);
                var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME || 'w7y2ublh', process.env.SENDGRID_PASSWORD || 'app28001807@heroku.com');
                sendgrid.send({
                    to:       ['feisajan@yahoo.com','mredwardchen@hotmail.com'],
                    from:     'csr2014@xinnamonj.com',
                    subject:  'CSR new subscriber notice',
                    text:     'New subscriber data:'+chunk
                }, function(err, json) {
                    if (err) { console.error(err); }
                    console.log(json);
                    res.template('subscriptionSent.ejs', {});
                });
            }
        });

    }

    switch (req.method) {
        case 'POST':
            handleForm(req, res);
            break;

        case 'GET':
            res.template('subscription.ejs', {});

    }
};
