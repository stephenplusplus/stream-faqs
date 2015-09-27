'use strict';

var JSONStream = require('JSONStream');
var pagedHttpStream = require('paged-http-stream');
var through2 = require('through2');

var requestOptions = {
  uri: 'http://localhost:8100/users'
};

function onResponse(response) {
  if (!response.nextPageToken) {
    // Nothing left to do.
    // Returning null will end the stream.
    return null;
  }

  // The response from the API contains the token we need to paginate.
  // Some APIs may work differently, with perhaps a timestamp.
  requestOptions.query = {
    nextPageToken: response.nextPageToken
  };

  return requestOptions;
}

var expectedUsers = 100;
var usersReceived = 0;

pagedHttpStream(requestOptions, onResponse)

  // We only care about the `users` array from the API response.
  .pipe(through2.obj(function(obj, enc, next) {
    next(null, obj.users);
  }))

  // This is a bit of a dance to split apart the 50-item arrays from the
  // response and emit each individual item as a data event. Tooling might have
  // already solved this for me, but I haven't found it yet!
  .pipe(JSONStream.stringify())
  .pipe(JSONStream.parse('*.*'))

  .on('data', function() {
    usersReceived++;
  })
  .on('end', function() {
    console.log('Did we get all of the users?');
    console.log(usersReceived === expectedUsers ? 'Yes!' : 'No :(');
  });
