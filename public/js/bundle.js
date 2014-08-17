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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lZGNoZW4vcHJvamVjdHMveGlubmFtb25qL2NzcjIwMTQvcHVibGljL2pzL2FwcC5qcyIsIi9Vc2Vycy9lZGNoZW4vcHJvamVjdHMveGlubmFtb25qL2NzcjIwMTQvcHVibGljL2pzL3NhdmVVc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbHMgd2luZG93ICovXG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzYXZlVXNlciA9IHJlcXVpcmUoJy4vc2F2ZVVzZXIuanMnKTtcbiAgc2F2ZVVzZXIoe25hbWU6ICdyb3NlJ30pO1xufTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlciwgY2IpIHtcbiAgLy8gc2F2ZSB1c2VyIGluIG91ciBEQi4gaW4gdGhlIHJlYWwgc2NlbmFyaW8gdGhpcyB3aWxsIGJlIGFuIGFzeW5jIGNhbGwgdG8gYW4gaHR0cCBlbmRwb2ludFxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygndXNlciAnICsgdXNlci5uYW1lICsgJyB3YXMgc2F2ZWQgaW4gdGhlIGRiJyk7XG4gICAgY2IgJiYgY2IoMjAwKTtcbiAgfSk7XG59O1xuIl19
;