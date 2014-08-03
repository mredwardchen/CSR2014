'use strict';

// npm packages
var st = require('st')
var mysql = require('mysql');
var db_config = {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'bd4a95664b8a91',
    password: '523b14e9',
    database: 'heroku_5431c85de1f5cac'
};

var connection;

function handleDisconnect() {
    console.log('1. connecting to db:');
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function(err) {              	// The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
        }                                     	// to avoid a hot loop, and to allow our node script to
    });                                     	// process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
            handleDisconnect();                      	// lost due to either server restart, or a
        } else {                                      	// connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

var mount = st(process.cwd());

module.exports = function (req, res) {
  if (req.url === '/users') {
      connection.query('SELECT * from t_users', function(err, rows, fields) {
          if (err) {
              console.log('error: ', err);
              throw err;
          }
          res.template('users.ejs', { title: 'Node.js Website Template', rows: rows});
      });
  } else {
    if (!mount(req, res)) return res.error(404)
  }
};
