'use strict';

// Rule exceptions:
/* eslint strict: "off" */
/* eslint comma-dangle: ["error", "never"] */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const myParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const version = require('./package.json').version;


// To allow hot-reloading, the node server only serves the React.js index.html
// in the /build file if SERVE_HTML is true
const ENV = process.env.ENV;
const SERVE_HTML = (process.env.SERVE_HTML === 'true');

// Get the admin/user credentials from environment variables
const ADMIN_USERNAME = process.env.SBR_UI_TEST_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.SBR_UI_TEST_ADMIN_PASSWORD;
const USER_USERNAME = process.env.SBR_UI_TEST_USER_USERNAME;
const USER_PASSWORD = process.env.SBR_UI_TEST_USER_PASSWORD;
const SECRET = process.env.JWT_SECRET;

// Store the user sessions
const users = {};

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
if (SERVE_HTML) {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
}

// For parsing the body of POST requests
app.use(myParser.json());

// Always return the main index.html, so react-router renders the route in the client
if (SERVE_HTML) {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
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

app.post('/login', (req, res) => {
  // Get the username/password from the body of the POST
  const username = req.body.username;
  const password = req.body.password;

  if (ENV === 'local') {
    /*
     * For local environment, need to compare username/password against
     * environment variables. If the provided username/password is correct, a
     * new key:value pair is added to the 'users' variable.
     *
     * key:value
     * username:hashed/salted(role,apiKey)
     *
     */
    if ((username === ADMIN_USERNAME && password === ADMIN_PASSWORD)
      || (username === USER_USERNAME && password === USER_PASSWORD)) {
      const apiKey = 'API Key';

      let role = 'user';
      if (username === ADMIN_USERNAME) {
        role = 'admin';
      }

      const payload = {
        username,
        role,
        apiKey
      };
      const jToken = jwt.sign(payload, SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });

      // Add user to key:value json store
      users[jToken] = { username, role };

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ jToken, username, role }));
    } else {
      // Return 401 NOT AUTHORIZED if incorrect username/password
      res.sendStatus(401);
    }
  } else if (ENV === 'deployed') {
    /*
     * For the deployed environment, the username/password is sent off to the
     * gateway, which will return 200 OK for a correct username/password or
     * 401 UNAUTHORIZED if they are incorrect.
     *
     *
     *
     */
  }
});

app.post('/checkToken', (req, res) => {
  const token = req.body.token;
  if (users[token] !== undefined) {
    jwt.verify(token, SECRET, (err) => {
      if (err) {
        delete users[token];
        res.sendStatus(401);
      } else {
        const decode = jwtDecode(token);
        const username = decode.username;
        const role = decode.role;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ token, username, role }));
      }
    });
  } else {
    res.sendStatus(401);
  }
});

app.post('/logout', (req, res) => {
  const token = req.body.token;
  // Remove user from storage
  delete users[token];
  res.sendStatus(200);
});

app.get('/info', (req, res) => {
  res.send(JSON.stringify({
    version,
    lastUpdate: 'placeholder'
  }));
});

app.get('/search/:id', (req, res) => {
  const timeStamp = Date.now();
  const rand = Math.floor(Math.random() * 10) + 1;
  const randMs = Math.floor(Math.random() * 3000) + 250;
  if (timeStamp.toString().charAt(rand) % 2 === 0) {
    setTimeout(() => {
      res.sendStatus(404);
    }, 100);
  } else {
    setTimeout(() => {
      res.send(JSON.stringify({
        name: 'Test Business',
        idbrEntRef: 213821383,
        sbrEntRef: 892371982731,
        address: {
          line1: '153 High Street',
          line2: '',
          line3: '',
          townCity: 'Newport',
          county: 'Gwent',
          postCode: 'NP20 8XG'
        },
        legalStatus: 2,
        SIC07: 313213,
        liveLegalUnit: 1,
        liveVat: 2,
        livePaye: 0,
        employees: 202,
        workingProps: 2,
        employment: 204,
        turnover: 23123323
      }));
    }, 100);
  }
});

module.exports = app;
