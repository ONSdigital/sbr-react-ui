'use strict';

// Rule exceptions:
/* eslint strict: "off" */
/* eslint comma-dangle: ["error", "never"] */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
var myParser = require("body-parser");
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');

// To allow hot-reloading, the node server only serves the React.js index.html
// in the /build file if SERVE_HTML is true
const ENV = process.env.ENV;
const SERVE_HTML = (process.env.SERVE_HTML === 'true');

// Get the admin/user credentials from environment variables
const ADMIN_USERNAME = process.env.ONS_BI_UI_TEST_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ONS_BI_UI_TEST_ADMIN_PASSWORD;
const USER_USERNAME = process.env.ONS_BI_UI_TEST_USER_USERNAME;
const USER_PASSWORD = process.env.ONS_BI_UI_TEST_USER_PASSWORD;
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
      const token = Math.random().toString(36).substring(7);
      const time = new Date();
      time.setMinutes(time.getMinutes() + 1);
      const expiry = time;
      const apiKey = 'API Key';

      let role = 'user';
      if (username === ADMIN_USERNAME) {
        role = 'admin';
      }

      var payload = {
        username: username,
        role: role,
        apiKey: apiKey,
      }
      const token = jwt.sign(payload, SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });

      // Add user to key:value json store
      users[token] = {username,role};

      res.send(JSON.stringify(
        {
          token
        }
      ));
     } else {
       // Return 401 NOT AUTHORIZED if incorrect username/password
       res.sendStatus(401);
     }
  } else if (ENV === "deployed"){
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
  if (users[token] !== undefined){
    jwt.verify(token, SECRET, function(err, user) {
      if (err) {
        delete users[token];
        res.sendStatus(401);
      }
      else {
        res.send(JSON.stringify(
          {
            token
          }
        ));
      }
    });
  } else {
    delete users[token];
    res.sendStatus(401);
  }
});

app.post('/logout', (req, res) => {
  const token = req.body.token;
  // Remove user from storage
  delete users[token];
  res.sendStatus(200);
});

module.exports = app;
