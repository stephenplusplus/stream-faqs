'use strict';

var Chance = require('chance');
var express = require('express');

var chance = new Chance();
chance.mixin({
  user: function() {
    return {
      first: chance.first(),
      last: chance.last(),
      email: chance.email()
    };
  }
});

function buildApiResponseWithoutNextPageToken() {
  var usersToCreate = 50;

  var apiResponse = {
    users: []
  };

  while (usersToCreate--) {
    apiResponse.users.push(chance.user());
  }

  return apiResponse;
}

function buildApiResponseWithNextPageToken() {
  var apiResponse = buildApiResponseWithoutNextPageToken();
  apiResponse.nextPageToken = 'next-page-please';
  return apiResponse;
}

var app = express();

app.get('/users', function(req, res) {
  if (!req.query.nextPageToken) {
    res.end(JSON.stringify(buildApiResponseWithNextPageToken()));
  } else {
    res.end(JSON.stringify(buildApiResponseWithoutNextPageToken()));
  }
});

app.listen(8100);
