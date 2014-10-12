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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lZGNoZW4vcHJvamVjdHMveGlubmFtb25qL2NzcjIwMTQtbmV3LWxheW91dC9wdWJsaWMvanMvYXBwLmpzIiwiL1VzZXJzL2VkY2hlbi9wcm9qZWN0cy94aW5uYW1vbmovY3NyMjAxNC1uZXctbGF5b3V0L3B1YmxpYy9qcy9zYXZlVXNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWxzIHdpbmRvdyAqL1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2F2ZVVzZXIgPSByZXF1aXJlKCcuL3NhdmVVc2VyLmpzJyk7XG4gIHNhdmVVc2VyKHtuYW1lOiAncm9zZSd9KTtcbn07XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZXIsIGNiKSB7XG4gIC8vIHNhdmUgdXNlciBpbiBvdXIgREIuIGluIHRoZSByZWFsIHNjZW5hcmlvIHRoaXMgd2lsbCBiZSBhbiBhc3luYyBjYWxsIHRvIGFuIGh0dHAgZW5kcG9pbnRcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coJ3VzZXIgJyArIHVzZXIubmFtZSArICcgd2FzIHNhdmVkIGluIHRoZSBkYicpO1xuICAgIGNiICYmIGNiKDIwMCk7XG4gIH0pO1xufTtcbiJdfQ==
;