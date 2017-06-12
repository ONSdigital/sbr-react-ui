// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
var myParser = require("body-parser");

// Get the admin/user credentials from environment variables
const ADMIN_USERNAME = process.env.ONS_BI_UI_TEST_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ONS_BI_UI_TEST_ADMIN_PASSWORD;
const USER_USERNAME = process.env.ONS_BI_UI_TEST_USER_USERNAME;
const USER_PASSWORD = process.env.ONS_BI_UI_TEST_USER_PASSWORD;
const ENV = "LOCAL";

const app = express();

let users = {};

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Below is for CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(myParser.json());// On local environment, use environment variables for user/pass authorization

app.post('/login', function (req, res, next) {
  //const authHeader = req.get("Authorization");
  // The header looks like the following:
  // Authorization: Basic <Base 64 Encoded Username/Password>
  // Only need to decode the encoded part, not the 'Basic'
  // const authCredentials = authHeader.substring(6,authHeader.length);
  // const base64Decode = new Buffer(authCredentials, 'base64');
  // const decodedCredentials = base64Decode.toString();
  // The username is everything before the first colon
  //const username = decodedCredentials.substr(0, decodedCredentials.indexOf(':'));
  //const password = decodedCredentials.substr(decodedCredentials.indexOf(':') + 1, decodedCredentials.length);

  const username = req.body.username;
  const password = req.body.password;

  if (ENV === "LOCAL"){
    /*
     * For local environment, need to compare username/password against
     * environment variables. If the provided username/password is correct, a
     * new key:value pair is added to the 'users' variable.
     *
     * key:value
     * username:hashed/salted(role,apiKey)
     *
     */
     if ((username === ADMIN_USERNAME && password === ADMIN_PASSWORD) || (username === USER_USERNAME && password === USER_PASSWORD)){
       const token = Math.random().toString(36).substring(7);
       let time = new Date();
       time.setMinutes(time.getMinutes() + 1);
       const expiry = time;
       const apiKey = "API Key";

       let role = "user";
       if (username === ADMIN_USERNAME){
         role = "admin";
       }

       // Add user to key:value json store
       users[token] = {username,role,apiKey,expiry};

       res.send(JSON.stringify(
         {
           role,
           apiKey,
           token,
           expiry
         }
       ));
     } else {
       // Return 401 NOT AUTHORIZED if incorrect username/password
       res.sendStatus(401);
     }
  } else if (ENV === "DEPLOYED"){
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

app.post('/checkToken', function (req, res) {
  const token = req.body.token;
  if (users[token] !== undefined){
    const role = users[token].role;
    const username = users[token].username;
    const expiry = users[token].expiry;
    const apiKey = users[token].apiKey;
    res.send(JSON.stringify(
      {
        role,
        apiKey,
        token,
        expiry,
        username
      }
    ));
  } else {
    res.sendStatus(401);
  }
});

app.post('/logout', function (req, res) {
  const token = req.body.token;
  // remove user from storage
  delete users[token]
  res.sendStatus(200);
});

module.exports = app;
