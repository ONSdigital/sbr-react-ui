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
const logger = require('./logger');

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
  logger.info('Serving static html in build dir');
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
}

// Below is for CORS, CORS is only needed when React/Node are on different ports
// e.g. when testing locally and React is on 3000 and Node is on 3001
if (ENV === 'local') {
  logger.info('Using Access-Control-Allow-Origin CORS headers');
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
}

// This method needs to be above the serve React code
// If it's below, the get('*') will point all GETs to the React
app.get('/info', cache(), (req, res) => {
  logger.info('Returning /info');
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
          logger.info('Successful login');
          res.setHeader('Content-Type', 'application/json');
          return res.send(JSON.stringify({
            username,
            accessToken: sessionJson.accessToken,
            role: sessionJson.role
          }));
        })
        .catch(() => {
          logger.error('Login 500 server error');
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      logger.error('Unable to login, timeout or server error');
      if (err.statusCode) return res.sendStatus(err.statusCode);
      return res.sendStatus(504); // Timeout
    });
});

app.post('/api', (req, res) => {
  // re route api requests with API key
  const method = req.body.method;
  const endpoint = req.body.endpoint;
  const accessToken = req.get('Authorization');
  getApiKey(accessToken)
    .then((data) => {
      if (method === 'GET') {
        getApiEndpoint(`${urls.API_GW}/sbr/${endpoint}`, data.apiKey)
          .then((response) => {
            logger.info('Returning GET response from API Gateway');
            return res.send(response);
          })
          .catch((err) => {
            logger.info('Error in API Gateway for GET request');
            return res.status(err.statusCode).send(err);
          });
      } else if (method === 'POST') {
        const postBody = req.body.postBody;
        postApiEndpoint(`${urls.API_GW}/sbr/${endpoint}`, postBody, data.apiKey)
          .then((response) => {
            logger.info('Returning POST response from API Gateway');
            return res.send(response);
          })
          .catch((err) => {
            logger.info('Error in API Gateway for POST request');
            return res.status(err.statusCode).send(err);
          });
      }
    })
    .catch(() => {
      logger.info('Unable to use /api endpoint, not authenticated');
      return res.sendStatus(401);
    });
});

function getApiEndpoint(url, apiKey) {
  logger.debug(`GET API endpoint for url: ${url}`);
  const options = {
    method: 'GET',
    headers: {
      'Authorization': apiKey
    },
    uri: url,
    timeout: timeouts.API_GET
  };

  return rp(options);
}

function postApiEndpoint(url, postBody, apiKey) {
  logger.debug(`POST API endpoint for url: ${url}`);
  const options = {
    method: 'POST',
    uri: url,
    timeout: timeouts.API_POST,
    headers: {
      'Authorization': apiKey,
      'Content-Type': 'application/json'
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
    logger.info('Valid token');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ username: json.username, accessToken }));
  })
  .catch(() => {
    logger.info('Invalid token');
    res.sendStatus(401);
  });
});

app.post('/logout', (req, res) => {
  const accessToken = req.body.accessToken;

  killRedisSession(accessToken)
  .then(() => {
    logger.info('Successful user log out');
    res.sendStatus(200);
  })
  .catch(() => {
    logger.info('Unable to log user out');
    res.sendStatus(401);
  });
});

function createRedisSession(username, remoteAddress, key, role) {
  logger.debug('Creating new Redis session');
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

function getApiKey(accessToken) {
  logger.debug('Getting API Key from Redis session');
  return new Promise((resolve, reject) => {
    rs.get({
      app: rsapp,
      token: accessToken
    }, (err, resp) => {
      if (err) reject();
      // If the session has timed out, the response will be empty
      if (Object.keys(resp).length === 0 && resp.constructor === Object) reject();
      resolve({ username: resp.id, accessToken, apiKey: resp.d.key });
    });
  });
}

function getRedisSession(accessToken) {
  logger.debug('Getting Redis session');
  return new Promise((resolve, reject) => {
    rs.get({
      app: rsapp,
      token: accessToken
    }, (err, resp) => {
      if (err) reject();
      // If the session has timed out, the response will be empty
      if (Object.keys(resp).length === 0 && resp.constructor === Object) reject();
      resolve({ username: resp.id, accessToken });
    });
  });
}

function killRedisSession(accessToken) {
  logger.debug('Killing Redis session');
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
