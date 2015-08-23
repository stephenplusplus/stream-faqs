'use strict';

var duplexify = require('duplexify');
var request = require('request');

//₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋//
//--- THIS IS NEW ---//
//⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻//
var streamEvents = require('stream-events');

function getToken(callback) {
  request('http://localhost:8100/token', function(err, resp, body) {
    if (err) {
      callback(err);
      return;
    }

    if (resp.statusCode !== 200) {
      callback(new Error('Request failed.'));
      return;
    }

    callback(null, body);
  });
}

function makeAuthorizedRequest(requestOptions) {
  var dup = streamEvents(duplexify());

  //₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋//
  //--- THIS IS NEW ---//
  //⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻//
  // The stream is now being read from. Let's go and get that token.
  dup.on('reading', function() {
    console.log('Getting token...');
    getToken(function(err, token) {
      if (err) {
        dup.destroy(err);
        return;
      }

      // Set the token on the query string.
      requestOptions.qs = {
        token: token
      };

      // Set the readable portion of the duplexify stream to a request that is
      // now properly authorized.
      dup.setReadable(request(requestOptions));
    });
  });

  return dup;
}

var requestOptionsThatNeedAuthorization = {
  uri: 'http://localhost:8100/admin'
};

//₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋//
//--- THIS IS NEW ---//
//⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻//
var stream = makeAuthorizedRequest(requestOptionsThatNeedAuthorization);

setTimeout(function() {
  console.log('Ready to use the stream now!');
  stream
    .on('error', console.error)
    .pipe(process.stdout);
}, 2000);
// => node .
// => (2 seconds go by...)
// => Ready to use the stream now!
// => Getting token...
// => Access granted!