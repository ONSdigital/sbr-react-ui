const logger = require('../logger');
const { Client } = require('pg');
const uuidv4 = require('uuid/v4');

const client = new Client();

// pg.defaults.poolSize ??

// TODO: use the proper way of using pools/clients
// https://gist.github.com/brianc/f906bacc17409203aee0
// https://stackoverflow.com/questions/8484404/what-is-the-proper-way-to-use-the-node-js-postgresql-module
// https://node-postgres.com/api/client
// Where to put client.connect?

class PsqlSession {
  constructor() {
    this.name = 'psql';
    this.tableName = 'sbr_sessions';
    client.connect();
  }

  createSession(username, remoteAddress, key, role) {
    logger.debug('Creating new PostgreSQL session');

    return new Promise((resolve, reject) => {
      const accessToken = uuidv4();

      const query = `INSERT INTO ${this.tableName}
      (accessToken, username, role, remoteAddress, apiKey)
      VALUES ('${accessToken}', '${username}', '${role}', '${remoteAddress}', '${key}');`;
      
      client.query(query)
      .then(res => {
        logger.debug('Create PostgreSQL session was successful');
        resolve({ accessToken, role });
      })
      .catch(error => {
        logger.error(`Create PostgreSQL session error: ${error}`);
        reject({ error });
      });
    });
  }

  getApiKey(accessToken) {
    logger.debug('Getting apiKey from PostgreSQL session');

    return new Promise((resolve, reject) => {
      const query = `
        UPDATE ${this.tableName}
        SET sessionExpire=now() + INTERVAL '8 hours'
        FROM (SELECT username, apiKey FROM ${this.tableName}) AS subquery
        WHERE accessToken='${accessToken}'
        RETURNING subquery.username, subquery.apiKey
      `;
      client.query(query)
      .then(res => {
        logger.debug('Get API Key from PostgreSQL session was successful');
        resolve({ username: res.rows[0].username, accessToken, apiKey: res.rows[0].apikey });
      })
      .catch(error => {
        logger.error(`Get API Key from PostgreSQL session error: ${error}`);
        reject({ error });
      });
    });
  }

  getSession(accessToken) {
    logger.debug('Getting PostgreSQL session');

    return new Promise((resolve, reject) => {
      const query = `
        UPDATE ${this.tableName}
        SET sessionExpire=now() + INTERVAL '8 hours'
        FROM (SELECT username FROM ${this.tableName}) AS subquery
        WHERE accessToken='${accessToken}'
        RETURNING subquery.username
      `;

      client.query(query)
      .then(res => {
        logger.debug('Get PostgreSQL session was successful');
        resolve({ username: res.rows[0].username, accessToken });
      })
      .catch(error => {
        logger.error(`Get PostgreSQL session error: ${error}`);
        reject({ error });
      });
    });
  }

  killSession(accessToken) {
    logger.debug('Killing PostgreSQL session');

    return new Promise((resolve, reject) => {
      client.query(`DELETE FROM ${this.tableName} WHERE accessToken='${accessToken}'`)
      .then(() => {
        logger.debug('Kill PostgreSQL session was successful');
        resolve();
      })
      .catch(error => {
        logger.error(`Kill PostgreSQL session error: ${error}`);
        reject({ error });
      });
    });
  }
}

module.exports = PsqlSession;
