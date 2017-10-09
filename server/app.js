'use strict';

// Rule exceptions:
/* eslint strict: "off" */
/* eslint comma-dangle: ["error", "never"] */
/* eslint no-console: "off" */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const myParser = require('body-parser');
const version = require('./package.json').version;
const formatDate = require('./formatDate.js');
const compression = require('compression');
const request = require('request');
const urls = require('../server/config/urls');
const RedisSessions = require('redis-sessions');
const cache = require('../server/cache');

const ENV = process.env.ENV;
const SERVE_HTML = (process.env.SERVE_HTML === 'true');
const startTime = formatDate(new Date());
const SESSION_EXPIRE = 60 * 60 * 8;
const rs = new RedisSessions();
const rsapp = 'sbr-ui-auth';

const app = express();

app.use(compression()); // gzip all responses
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(myParser.json()); // For parsing body of POSTs

// Serve static assets (static js files for React from 'npm run build')
if (SERVE_HTML) {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
}

// Below is for CORS, CORS is only needed when React/Node are on different ports
// e.g. when testing locally and React is on 3000 and Node is on 3001
if (ENV === 'local') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
}

// This method needs to be above the serve React code
// If it's below, the get('*') will point all GETs to the React
app.get('/info', cache(), (req, res) => {
  res.send(JSON.stringify({
    version,
    lastUpdate: startTime
  }));
});

// Always return the main index.html, so react-router renders the route in the client
if (SERVE_HTML) {
  app.get('*', cache(), (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

app.post('/login', (req, res) => {
  // Get the username/password from the body of the POST
  const username = req.body.username;
  const password = req.body.password;

  // TODO: refactor below to use promises rather than callbacks
  callApiGateway(username, password, (apiSuccess, apiData) => {
    if (apiSuccess) {
      createRedisSession(username, req.connection.remoteAddress, apiData.key, (sessionSuccess, sessionData) => {
        if (sessionSuccess) {
          res.setHeader('Content-Type', 'application/json');
          return res.send(JSON.stringify({
            username,
            accessToken: sessionData.accessToken,
            role: apiData.role
          }));
        }
        return res.sendStatus(500);
      });
    } else {
      return res.sendStatus(401);
    }
  });
});

app.post('/checkToken', (req, res) => {
  const accessToken = req.body.accessToken;
  rs.get({
    app: rsapp,
    token: accessToken
  }, (err, resp) => {
    if (err) {
      res.sendStatus(401);
    } else if (Object.keys(resp).length === 0 && resp.constructor === Object) {
      // If the session has timed out, the response will be empty
      res.sendStatus(401);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ username: resp.id, accessToken }));
    }
  });
});

app.post('/logout', (req, res) => {
  const accessToken = req.body.accessToken;

  // Kill the user session
  rs.kill({
    app: rsapp,
    token: accessToken
  }, (err, resp) => {
    if (err) {
      res.sendStatus(401);
    }
    res.sendStatus(200);
  });
});

function createRedisSession(username, remoteAddress, key, callback) {
  rs.create({
    app: rsapp,
    id: username,
    ip: remoteAddress,
    ttl: SESSION_EXPIRE,
    d: { key }
  }, (err, resp) => {
    if (!err) {
      return callback(true, { accessToken: resp.token });
    }
    return callback(false, { error: err });
  });
}

function callApiGateway(username, password, callback) {
  request.post({
    headers: { 'content-type': 'application/json' },
    url: urls.AUTH_URL,
    body: JSON.stringify({
      username,
      password
    })
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const requestBody = JSON.parse(body);
      const key = requestBody.key;
      const role = requestBody.role;
      return callback(true, { key, role });
    }
    return callback(false, { error });
  });
}

module.exports = app;
