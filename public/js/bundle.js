;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
/* globals window */

window.onload = function () {
  var saveUser = require('./saveUser.js');
  saveUser({name: 'rose'});
};


},{"./saveUser.js":2}],2:[function(require,module,exports){
module.exports = function (user, cb) {
  // save user in our DB. in the real scenario this will be an async call to an http endpoint
  setTimeout(function () {
    console.log('user ' + user.name + ' was saved in the db');
    cb && cb(200);
  });
};

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lY2hlbi9Qcm9qZWN0cy9jaW5uYW1vbi9jc3IyMDE0L3B1YmxpYy9qcy9hcHAuanMiLCIvVXNlcnMvZWNoZW4vUHJvamVjdHMvY2lubmFtb24vY3NyMjAxNC9wdWJsaWMvanMvc2F2ZVVzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFscyB3aW5kb3cgKi9cblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNhdmVVc2VyID0gcmVxdWlyZSgnLi9zYXZlVXNlci5qcycpO1xuICBzYXZlVXNlcih7bmFtZTogJ3Jvc2UnfSk7XG59O1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VyLCBjYikge1xuICAvLyBzYXZlIHVzZXIgaW4gb3VyIERCLiBpbiB0aGUgcmVhbCBzY2VuYXJpbyB0aGlzIHdpbGwgYmUgYW4gYXN5bmMgY2FsbCB0byBhbiBodHRwIGVuZHBvaW50XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKCd1c2VyICcgKyB1c2VyLm5hbWUgKyAnIHdhcyBzYXZlZCBpbiB0aGUgZGInKTtcbiAgICBjYiAmJiBjYigyMDApO1xuICB9KTtcbn07XG4iXX0=
;