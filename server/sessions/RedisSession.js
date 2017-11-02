const logger = require('../logger')(module);
const RedisSessions = require('redis-sessions');
const config = require('../config/sessions');

class RedisSession {
  constructor() {
    this.name = 'redis';
    this.rs = new RedisSessions();
    this.rsapp = 'sbr-ui-auth';
    this.sessionExpire = config.SESSION_EXPIRE;
  }

  createSession(username, remoteAddress, key, role) {
    logger.debug('Creating new Redis session');

    return new Promise((resolve, reject) => {
      this.rs.create({
        app: this.rsapp,
        id: username,
        ip: remoteAddress,
        ttl: this.sessionExpire,
        d: { key },
      }, (error, resp) => {
        if (!error) {
          logger.debug('Create Redis session was successful');
          resolve({ accessToken: resp.token, role });
        } else {
          logger.error(`Unable to create Redis session: ${error}`);
          reject({ error });
        }
      });
    });
  }
  
  getApiKey(accessToken) {
    logger.debug('Getting API Key from Redis session');

    return new Promise((resolve, reject) => {
      this.rs.get({
        app: this.rsapp,
        token: accessToken,
      }, (error, resp) => {
        if (error) {
          logger.error(`Unable to get API key from Redis session: ${error}`);
          reject({ error });
        } else if (Object.keys(resp).length === 0 && resp.constructor === Object) {
          // If the session has timed out, the response will be empty
          logger.debug('Redis session has timed out');
          reject({ error: 'Redis session has timed out' });
        } else {
          logger.debug('Get API Key from Redis session was successful');
          resolve({ username: resp.id, accessToken, apiKey: resp.d.key });
        }
      });
    });
  }
  
  getSession(accessToken) {
    logger.debug('Getting Redis session');

    return new Promise((resolve, reject) => {
      this.rs.get({
        app: this.rsapp,
        token: accessToken,
      }, (error, resp) => {
        if (error) {
          logger.error(`Unable to get Redis session: ${error}`);
          reject({ error });
        } else if (Object.keys(resp).length === 0 && resp.constructor === Object) {
          // If the session has timed out, the response will be empty
          logger.debug('Redis session has timed out');
          reject({ error: 'Redis session has timed out' });
        } else {
          logger.debug('Get Redis session was successful');
          resolve({ username: resp.id, accessToken });
        }
      });
    });
  }
  
  killSession(accessToken) {
    logger.debug('Killing Redis session');

    return new Promise((resolve, reject) => {
      this.rs.kill({
        app: this.rsapp,
        token: accessToken,
      }, (error) => {
        if (!error) {
          logger.debug('Redis session was successfully killed');
          resolve();
        } else {
          logger.error(`Unable to kill Redis session: ${error}`);
          reject({ error });
        }
      });
    });
  }
}

module.exports = RedisSession;
