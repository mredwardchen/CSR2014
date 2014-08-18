'use strict';

// npm package
var ejs = require('ejs');

module.exports = {
  name: 'test',
  port: 5000,
  engine: ejs, 
  templates: __dirname + '/../templates',
  db: require('../db/mock-db.js')
};
