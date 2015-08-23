'use strict';

var concat = require('concat-stream');
var request = require('request');

// The annoying way...
var results = new Buffer([]);

request('http://localhost:8100/users')
  .on('error', console.error)
  .on('data', function(chunk) {
    results = Buffer.concat([results, chunk]);
  })
  .on('end', function() {
    var users = parse(results).users;
    console.log(users.length); // 50
  });

// The easy way...
request('http://localhost:8100/users')
  .on('error', console.error)
  .pipe(concat(function(results) {
    var users = parse(results).users;
    console.log(users.length); // 50
  }));

function parse(results) {
  try {
    results = JSON.parse(results);
  } catch(e) {
    throw e;
  }

  return results;
}