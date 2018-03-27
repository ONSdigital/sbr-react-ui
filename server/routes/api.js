'use strict';

const app = require('../index');
const express = require('express');
const logger = require('../utilities/logger')(module);
const formatDate = require('../utilities/formatDate');
const version = require('../package.json').version;
const urls = require('../config/urls');
const timeouts = require('../config/timeouts');
const rp = require('request-promise');

const router = express.Router();

const startTime = formatDate(new Date());

const authMiddleware = function (req, res, next) {
  // This middleware will be used in every /api/ method to
  // validate the user provided accessToken
  const accessToken = req.get('Authorization');

  app.session.getSession(accessToken)
  .then((json) => {
    logger.info('Valid token');
    req.username = json.username;
    req.apiKey = json.apiKey;
    next();
  })
  .catch(() => {
    logger.info('Invalid token');
    res.sendStatus(401).end();
  });
};

router.get('/api/info', authMiddleware, (req, res) => {
  logger.info('Returning /info');
  res.send(JSON.stringify({
    version,
    lastUpdate: startTime,
  }));
});

// We don't need any authorisation for the /api/health route as we
// need to hit it from Jenkins
router.get('/api/health', (req, res) => {
  logger.info('Returning /health');
  res.send(JSON.stringify({
    status: 'OK',
  }));
});

router.post('/api', authMiddleware, (req, res) => {
  // re route api requests with API key
  const method = req.body.method;
  const endpoint = req.body.endpoint;

  const key = req.apiKey;
  // if (method === 'GET') {
  //   getApiEndpoint(`${urls.API_GW}/sbr/${endpoint}`, key)
  //     .then((response) => {
  //       logger.info('Returning GET response from API Gateway');
  //       return res.send(response);
  //     })
  //     .catch((err) => {
  //       logger.info('Error in API Gateway for GET request');
  //       return res.sendStatus(err.statusCode);
  //     });
  // } else if (method === 'POST') {
  //   const postBody = req.body.postBody;
  //   postApiEndpoint(`${urls.API_GW}/sbr/${endpoint}`, postBody, key)
  //     .then((response) => {
  //       logger.info('Returning POST response from API Gateway');
  //       return res.send(response);
  //     })
  //     .catch((err) => {
  //       logger.info('Error in API Gateway for POST request');
  //       return res.sendStatus(err.statusCode);
  //     });
  // }
  if (endpoint.includes('v1/periods/201802/lous/')) {
    const id = endpoint.split('/').slice(-1)[0];
    return res.json(
      {
        id,
        unitType: 'LOU',
        period: '201802',
        parents: {
          ENT: '12345',
        },
        vars: {
          lurn: id,
          luref: `${id}-IDBRREF`,
          ern: '12345',
          entref: '12345-ENTREF',
          name: 'Local Unit Name',
          tradingStyle: '7',
          address1: 'Government Offices',
          address2: 'Newport',
          address3: 'South Wales',
          address4: 'Wales',
          address5: 'UK',
          postcode: 'NP10 8XG',
          sic07: '11233',
          employees: 'A',
        },
      }
    );
  } else {
    return res.json([
      {
        id: '12345',
        children: {
          234234: 'LOU',
          734563: 'LOU',
          927492: 'LOU',
          398493: 'LOU',
          298742: 'LOU',
          192837465999: 'LEU',
          23847563: 'CH',
          38576395: 'PAYE',
          41037492: 'VAT',
        },
        childrenJson: [
          { type: 'LOU', id: '234234' },
          { type: 'LOU', id: '734563' },
          { type: 'LOU', id: '927492' },
          { type: 'LOU', id: '398493' },
          { type: 'LOU', id: '298742' },
        ],
        unitType: 'ENT',
        period: '201802',
        vars: {
          ent_name: 'Tesco',
          entref: '12345',
        },
      },
    ]);
  }
});

function getApiEndpoint(url, apiKey) {
  logger.debug(`GET API endpoint for url: ${url}`);
  const options = {
    method: 'GET',
    headers: {
      'Authorization': apiKey,
    },
    uri: url,
    timeout: timeouts.API_GET,
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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
    json: false,
  };

  return rp(options);
}

module.exports = router;
