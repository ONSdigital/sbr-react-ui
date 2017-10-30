const logger = require('../logger');
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
      }, (err, resp) => {
        if (!err) resolve({ accessToken: resp.token, role });
        reject({ error: err });
      });
    });
  }
  
  getApiKey(accessToken) {
    logger.debug('Getting API Key from Redis session');
    return new Promise((resolve, reject) => {
      this.rs.get({
        app: this.rsapp,
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
      this.rs.get({
        app: this.rsapp,
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
      this.rs.kill({
        app: this.rsapp,
        token: accessToken,
      }, (err) => {
        if (!err) resolve();
        reject();
      });
    });
  }
}

module.exports = RedisSession;
