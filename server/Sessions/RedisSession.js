const logger = require('../logger');
const RedisSessions = require('redis-sessions');
const config = require('../config/sessions');

const SESSION_EXPIRE = config.SESSION_EXPIRE;
const rs = new RedisSessions();
const rsapp = 'sbr-ui-auth';

class RedisSession {
  constructor() {
    this.name = 'redis';
  }

  createSession(username, remoteAddress, key, role) {
    logger.debug('Creating new Redis session');
    return new Promise((resolve, reject) => {
      rs.create({
        app: rsapp,
        id: username,
        ip: remoteAddress,
        ttl: SESSION_EXPIRE,
        d: { key },
      }, (err, resp) => {
        if (!err) resolve({ accessToken: resp.token, role });
        reject({ error: err });
      });
    });
  }
  
  getApiKey(accessToken) {
    logger.debug('Getting API Key from Redis session');
    return new Promise((resolve, reject) => {
      rs.get({
        app: rsapp,
        token: accessToken,
      }, (err, resp) => {
        if (err) reject();
        // If the session has timed out, the response will be empty
        if (Object.keys(resp).length === 0 && resp.constructor === Object) reject();
        resolve({ username: resp.id, accessToken, apiKey: resp.d.key });
      });
    });
  }
  
  getSession(accessToken) {
    logger.debug('Getting Redis session');
    return new Promise((resolve, reject) => {
      rs.get({
        app: rsapp,
        token: accessToken,
      }, (err, resp) => {
        if (err) reject();
        // If the session has timed out, the response will be empty
        if (Object.keys(resp).length === 0 && resp.constructor === Object) reject();
        resolve({ username: resp.id, accessToken });
      });
    });
  }
  
  killSession(accessToken) {
    logger.debug('Killing Redis session');
    return new Promise((resolve, reject) => {
      rs.kill({
        app: rsapp,
        token: accessToken,
      }, (err) => {
        if (!err) resolve();
        reject();
      });
    });
  }
}

module.exports = RedisSession;
