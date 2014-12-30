'use strict';

// npm package
var ejs = require('ejs');

module.exports = {
  name: 'prod',
  port: 80,
  engine: ejs, 
  templates: __dirname + '/../templates',
  db: require('../db/db.js')
};
