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
const formatDate = require('./helpers/formatDate.js');
const compression = require('compression');
const urls = require('./config/urls');
const timeouts = require('./config/timeouts');
const RedisSessions = require('redis-sessions');
const cache = require('../server/helpers/cache');
const rp = require('request-promise');

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

  const options = {
    method: 'POST',
    uri: urls.AUTH_URL,
    timeout: timeouts.API_GW,
    headers: { 'content-type': 'application/json' },
    json: true,
    body: { username, password }
  };

  rp(options)
    .then((gatewayJson) => {
      createRedisSession(username, req.connection.remoteAddress, gatewayJson.key, gatewayJson.role)
        .then((sessionJson) => {
          res.setHeader('Content-Type', 'application/json');
          return res.send(JSON.stringify({
            username,
            accessToken: sessionJson.accessToken,
            role: sessionJson.role
          }));
        })
        .catch(() => res.sendStatus(500));
    })
    .catch((err) => {
      if (err.statusCode) return res.sendStatus(err.statusCode);
      return res.sendStatus(504); // Timeout
    });
});

app.post('/api', (req, res) => {
  // re route api requests with API key
  const method = req.body.method;
  const endpoint = req.body.endpoint;
  if (method === 'GET') {
    getApiEndpoint(`${urls.API_URL}/${endpoint}`)
      .then((response) => {
        return res.send(response);
      })
      .catch((err) => {
        return res.sendStatus(err.statusCode).send(err);
      });
  } else if (method === 'POST') {
    const postBody = req.body.postBody;
    postApiEndpoint(`${urls.API_URL}/${endpoint}`, postBody)
      .then((response) => {
        return res.send(response);
      })
      .catch((err) => {
        return res.status(err.statusCode).send(err);
      });
  }
});

function getApiEndpoint(url) {
  const options = {
    method: 'GET',
    uri: url,
    timeout: timeouts.API_GET
  };

  return rp(options);
}

function postApiEndpoint(url, postBody) {
  const options = {
    method: 'POST',
    uri: url,
    timeout: timeouts.API_POST,
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    },
    body: JSON.stringify(postBody), // '{"updatedBy":"name","vars":{"ent_name":"name"}}',
    json: false
  };

  return rp(options);
}

app.post('/checkToken', (req, res) => {
  const accessToken = req.body.accessToken;

  getRedisSession(accessToken)
  .then((json) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ username: json.username, accessToken }));
  })
  .catch(() => res.sendStatus(401));
});

app.post('/logout', (req, res) => {
  const accessToken = req.body.accessToken;

  killRedisSession(accessToken)
  .then(() => res.sendStatus(200))
  .catch(() => res.sendStatus(401));
});

function createRedisSession(username, remoteAddress, key, role) {
  return new Promise((resolve, reject) => {
    rs.create({
      app: rsapp,
      id: username,
      ip: remoteAddress,
      ttl: SESSION_EXPIRE,
      d: { key }
    }, (err, resp) => {
      if (!err) resolve({ accessToken: resp.token, role });
      reject({ error: err });
    });
  });
}

function getRedisSession(accessToken) {
  return new Promise((resolve, reject) => {
    rs.get({
      app: rsapp,
      token: accessToken
    }, (err, resp) => {
      if (err) reject();
      // If the session has timed out, the response will be empty
      if (Object.keys(resp).length === 0 && resp.constructor === Object) reject()
      resolve({ username: resp.id, accessToken });
    });
  });
}

function killRedisSession(accessToken) {
  return new Promise((resolve, reject) => {
    rs.kill({
      app: rsapp,
      token: accessToken
    }, (err) => {
      if (!err) resolve();
      reject();
    });
  });
}

module.exports = app;
