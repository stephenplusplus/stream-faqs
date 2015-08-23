'use strict';

var duplexify = require('duplexify');
var request = require('request');

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
  var dup = duplexify();

  getToken(function(err, token) {
    if (err) {
      dup.destroy(err);
      return;
    }

    // Set the token on the query string.
    requestOptions.qs = {
      token: token
    };

    // Set the readable portion of the duplexify stream to a request that is now
    // properly authorized.
    dup.setReadable(request(requestOptions));
  });

  return dup;
}

var requestOptionsThatNeedAuthorization = {
  uri: 'http://localhost:8100/admin'
};

makeAuthorizedRequest(requestOptionsThatNeedAuthorization)
  .on('error', console.error)
  .pipe(process.stdout);
// => Access granted!