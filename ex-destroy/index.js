'use strict';

var pumpify = require('pumpify');
var request = require('request');

function withoutPumpify() {
  var readableRequestStream = request('http://does-not-exist');
  var writableRequestStream = request.post('http://localhost:8100/users');

  readableRequestStream.on('error', console.error);

  writableRequestStream.on('abort', function() {
    console.log('Not emitted :(');
  });

  readableRequestStream.pipe(writableRequestStream);
}

withoutPumpify();
// => { [Error: getaddrinfo ENOTFOUND does-not-exist]
//      code: 'ENOTFOUND',
//      errno: 'ENOTFOUND',
//      syscall: 'getaddrinfo',
//      hostname: 'does-not-exist' }

function withPumpify() {
  var readableRequestStream = request('http://does-not-exist');
  var writableRequestStream = request.post('http://localhost:8100/users');

  readableRequestStream.on('error', console.error);

  writableRequestStream.on('abort', function() {
    console.log('Emitted :)');
  });

  pumpify(readableRequestStream, writableRequestStream);
}

withPumpify();
// => { [Error: getaddrinfo ENOTFOUND does-not-exist]
//      code: 'ENOTFOUND',
//      errno: 'ENOTFOUND',
//      syscall: 'getaddrinfo',
//      hostname: 'does-not-exist' }
// => Emitted :)