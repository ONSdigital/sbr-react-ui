// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Get the admin/user credentials from environment variables
const ADMIN_USERNAME = process.env.ONS_BI_UI_TEST_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ONS_BI_UI_TEST_ADMIN_PASSWORD;
const USER_USERNAME = process.env.ONS_BI_UI_TEST_USER_USERNAME;
const USER_PASSWORD = process.env.ONS_BI_UI_TEST_USER_PASSWORD;

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router renders the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// On local environment, use environment variables for user/pass authorization
app.post('/authorise', function (req, res) {
  const authHeader = req.get("Authorization");
  // The header looks like the following:
  // Authorization: Basic <Base 64 Encoded Username/Password>
  // Only need to decode the encoded part, not the 'Basic'
  const authCredentials = authHeader.substring(6,authHeader.length);
  const base64Decode = new Buffer(authCredentials, 'base64');
  const decodedCredentials = base64Decode.toString();
  // The username is everything before the first colon
  const username = decodedCredentials.substr(0, decodedCredentials.indexOf(':'));
  const password = decodedCredentials.substr(decodedCredentials.indexOf(':') + 1, decodedCredentials.length);

  // Return the role (admin/user) associated with the login username
  // An API Key is returned however it is not used locally
  if ((username === ADMIN_USERNAME && password === ADMIN_PASSWORD) || (username === USER_USERNAME && password === USER_PASSWORD)){
    if (username === ADMIN_USERNAME){
      res.send(JSON.stringify(
        {
          role: "admin",
          key: "API Key"
        }
      ));
    } else if (username === USER_USERNAME){
      res.send(JSON.stringify(
        {
          role: "user",
          key: "API Key"
        }
      ));
    }
  } else {
    // Return 401 NOT AUTHORIZED if incorrect username/password
    res.sendStatus(401);
  }
});

module.exports = app;
