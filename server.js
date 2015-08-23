'use strict';

var Chance = require('chance');
var express = require('express');

var app = express();
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

var accessToken = 'access-token';

app.get('/users', function(req, res) {
  if (!req.query.nextPageToken) {
    res.end(JSON.stringify(buildApiResponseWithNextPageToken()));
  } else {
    res.end(JSON.stringify(buildApiResponseWithoutNextPageToken()));
  }
});

app.post('/users', function(req, res) {
  res.end();
});

app.get('/token', function(req, res) {
  res.end(accessToken);
});

app.get('/admin', function(req, res) {
  if (req.query.token === accessToken) {
    res.end('Access granted!');
  } else {
    res.sendStatus(401);
  }
});

app.listen(8100);
