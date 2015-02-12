'use strict';

var cookie = require('cookie');
var requestIp = require('request-ip');
var geoip = require('geoip-lite');
var UAParser = require('ua-parser-js');
var parser = new UAParser();
var querystring = require('querystring');
var GoogleSpreadsheet = require("google-spreadsheet");
var my_sheet = new GoogleSpreadsheet('1VBxir1Gbrgfe3h5Q9deTr52Uh-IkqjfWJ_2VhHnZH-0');


module.exports = hint;

// hint service for tagger requests

function hint (req, res, config) {

    var data = {};
    var cookies = req.headers['cookie'] ? req.headers['cookie'] : 'NA';
    var host = req.headers['host'] ? req.headers['host'] : 'NA';
    var referer = req.headers['referer'] ? req.headers['referer'] : 'NA';
    var ua = req.headers['user-agent'] ? req.headers['user-agent'] : 'NA';
    var remoteAddr = req.headers['REMOTE_ADDR'] ? req.headers['REMOTE_ADDR'] : 'NA';
    var url = req.url; // '/csrhint/site/2?ret=html&like=foo%3Dbar&like=__xj_t%3DChip%20Scale%20Review%20Magazine%20-%20The%20International%20Magazine%20for%20Device%20and%20Wafer-Level%20Test%2C%20Assembly%2C%20and%20Packaging%20Addressing%20High-density%20Interconnection%20of%20Microelectronic%20IC%27s%20including%203D%20packages%2C%20MEMS%2C%20MOEMS%2C%20RF%2FWireless%2C%20Optoelectronic%20and%20Other%20Wafer-fabricated%20Devices%20for%20the%2021st%20Century&like=__xj_k%3DChip%20Scale%20Review%20Magazine%2C%20Device%20test%2C%20Wafer-Level%20Test%2C%20wafer%20Assembly%2C%20wafer%20Packaging%2C%20High-density%20Interconnection%2C%20Microelectronic%2C%20IC%2C%203D%20packages%2C%20MEMS%2C%20MOEMS%2C%20RF%2FWireless%2C%20Optoelectronic%2C%20semiconductor%2C%20wafer%20manufacturing%2C%20wafer%20fabrication&like=__xj_l%3Dhttp%3A%2F%2Flocalhost%3A5000%2Fabout.html&xjuid=1451044903&r=18338017';

    try {
        // parse user ID
        if (cookies !== 'NA') {
            var c = cookie.parse(cookies);
            if (c && c.hasOwnProperty('xjuid')) {
                data['xjuid'] = c['xjuid'];
                //console.log('uid==>'+c['xjuid']);
            }
        }

        // parse hostname and geo location
        var clientIp = requestIp.getClientIp(req); // on loaclhost > 127.0.0.1
        var geo = geoip.lookup(clientIp);
        if (!geo) geo = 'NA';
        //data['geo'] = geo;
        data['geo'] = remoteAddr;
        data['country'] = geo['country'] ? geo['country'] : 'NA';
        data['region'] = geo['region'] ? geo['region'] : 'NA';
        data['city'] = geo['city'] ? geo['city'] : 'NA';
        data['ll'] = geo['ll'] ? geo['ll'].toString() : 'NA';
        //console.log('Geo==>'+geo);

        // parse user agent
        if (ua !== 'NA') {
            var parsedUA = parser.setUA(ua).getResult();
            data['browser'] = parsedUA['browser']['name'];
            data['browserver'] = parsedUA['browser']['version'];
            data['os'] = parsedUA['os']['name'];
            data['ua'] = JSON.stringify(parsedUA);
            //console.log('ua==>'+JSON.stringify(parsedUA));
        }

        // http referer
        // data['referer'] = referer;
        // console.log('referer==>'+referer);
        // hints, referer, location

        var durl = decodeURIComponent(url);
        var pos = durl.indexOf('?');
        if (pos > -1) {
            var qs = querystring.parse(durl.substr(pos)+1);
            var like = qs['like'];
            var hints = '';
            for (var i=0; i< like.length; i++) {
                var s = like[i];
                if (s.indexOf('__xj')===0) {
                    if (s.indexOf('__xj_pr')===0) {
                        data['referer'] = s.substr(s.indexOf('=')+1);
                    } else if (s.indexOf('__xj_l')===0) {
                        data['location'] = s.substr(s.indexOf('=')+1);
                    }
                } else {
                    hints = hints + ',' + s;
                }
            }
            data['hints'] = hints;
            //console.log('hints==>'+JSON.stringify(qs));
        }


        try {
            my_sheet.setAuth('pp238248@gmail.com','hell0k1tty', function(err){
                if (err) {
                    console.log('** Err:'+err);
                    return;
                }

                //console.log(' GOOGLE AUTH SUCCESS!' );

                // timestamp
                var d = new Date();
                var wsID = d.getMonth() + 1;
                data['timestamp'] = d.toString();
                my_sheet.addRow(wsID, data, function(err, status){
                  if (err) {
                    console.error(err);
                  } else {
                    //console.log('hint recorded');
                  }
                });
             });
        } catch(err) {}
    } catch(err) {}

}
