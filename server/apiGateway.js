'use strict';

/* eslint strict: "off" */
/* eslint no-console: "off" */
/* eslint comma-dangle: ["error", "never"] */

const express = require('express');
const morgan = require('morgan');
const myParser = require('body-parser');
const compression = require('compression');
const bcrypt = require('bcryptjs');
const genSalt = require('./helpers/salt.js');
const uuidv4 = require('uuid/v4');

const PORT = process.env.PORT || 3002;

// Get the admin/user credentials from environment variables
const ADMIN_USERNAME = process.env.SBR_UI_TEST_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.SBR_UI_TEST_ADMIN_PASSWORD;
const USER_USERNAME = process.env.SBR_UI_TEST_USER_USERNAME;
const USER_PASSWORD = process.env.SBR_UI_TEST_USER_PASSWORD;

// Create the hashed password using the salt
const ADMIN_HASHED_PASSWORD = bcrypt.hashSync(ADMIN_PASSWORD, genSalt(ADMIN_USERNAME));
const USER_HASHED_PASSWORD = bcrypt.hashSync(USER_PASSWORD, genSalt(USER_USERNAME));

// We use the users JSON as a mock database holding { username: hashed_password }
const users = {};
users[ADMIN_USERNAME] = ADMIN_HASHED_PASSWORD;
users[USER_USERNAME] = USER_HASHED_PASSWORD;

const app = express();
app.use(compression()); // gzip all responses
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(myParser.json()); // For parsing body of POSTs

app.post('/auth', (req, res) => {
  // Get the username/password from the body of the POST
  const username = req.body.username;
  const password = req.body.password;

  // If the provided username/password match the username/password in the users JSON,
  // return an API key and the user role
  if (users[username] && users[username] === password) {
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify({
      key: uuidv4(),
      role: username
    }));
  }
  return res.sendStatus(401);
});

app.listen(PORT, () => {
  console.log(`sbr-ui-mock-api-gateway listening on port ${PORT}!`);
});
