'use strict';

var JSONStream = require('JSONStream');
var multistream = require('multistream');
var request = require('request');

var allResultsFetched = false;
var nextPageToken;
var requestOptions = {
  uri: 'http://localhost:8100/users'
};

function makeRequest(callWithAStream) {
  if (allResultsFetched) {
    // Nothing left to do.
    // Let multistream end the readable portion of this pipeline.
    callWithAStream();
    return;
  }

  if (nextPageToken) {
    requestOptions.qs = {
      nextPageToken: nextPageToken
    };
    nextPageToken = '';
  }

  var requestStream = request(requestOptions);

  // This is somewhat annoying...
  //
  // The response from the API contains the token we need to paginate.
  // Some APIs may work differently, with perhaps a timestamp. If that's the
  // case for the API you use, then this kind of solution might not be
  // necessary.
  requestStream.on('response', function(response) {
    response
      .pipe(JSONStream.parse('nextPageToken'))
      .on('data', function(_nextPageToken) {
        nextPageToken = _nextPageToken;
      })
      .on('end', function() {
        if (!nextPageToken) {
          allResultsFetched = true;
        }
      });
  });

  // We have our stream. Tell multistream "run this one now".
  //
  // Our script will get this far twice; once without a nextPageToken, and the
  // next with it.
  callWithAStream(null, requestStream);
}

var expectedUsers = 100;
var usersReceived = 0;

multistream(makeRequest)
  .pipe(JSONStream.parse('users.*'))
  .on('data', function() {
    usersReceived++;
  })
  .pipe(JSONStream.stringify())
  .on('end', function() {
    console.log('Did we get all of the users?');
    console.log(usersReceived === expectedUsers ? 'Yes!' : 'No :(');
  })
  .pipe(process.stdout);
