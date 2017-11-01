const uuidv4 = require('uuid/v4');
const logger = require('../logger');
const config = require('../config/sessions');

class JsonSession {
  constructor() {
    this.name = 'json';
    this.sessionExpireHours = config.SESSION_EXPIRE_HOURS;
    this.session = {};
  }

  createSession(username, remoteAddress, key, role) {
    logger.debug('Creating new JSON session');
    
    return new Promise((resolve, reject) => {
      const accessToken = uuidv4();
      try {
        const sessionExpire = new Date();
        sessionExpire.setHours(sessionExpire.getHours() + this.sessionExpireHours);
        this.session[accessToken] = {
          key,
          role,
          username,
          remoteAddress,
          sessionExpire,
        };
        logger.debug('Create JSON session was successful');
        resolve({ accessToken, role });
      } catch (error) {
        logger.error(`Unable to create JSON session: ${error}`);
        reject({ error });
      }
    });
  }

  getApiKey(accessToken) {
    logger.debug('Getting API Key from JSON session');

    return new Promise((resolve, reject) => {
      try {
        const userSession = this.session[accessToken];
        const username = userSession.accessToken;
        const apiKey = userSession.key;
        const sessionExpire = userSession.sessionExpire;
        if (new Date() > sessionExpire) {
          logger.debug('JSON session has timed out');
          delete this.userSession[accessToken];
          reject({ error: 'JSON session has timed out' });
        } else {
          logger.debug('Get API Key from JSON session was successful');
          resolve({ username, accessToken, apiKey });
        }
      } catch (error) {
        logger.error(`Unable to get API key from JSON session: ${error}`);
        reject({ error });
      }
    });
  }

  getSession(accessToken) {
    logger.debug('Getting JSON session');
    
    return new Promise((resolve, reject) => {
      try {
        const userSession = this.session[accessToken];
        const username = userSession.accessToken;
        const sessionExpire = userSession.sessionExpire;
        if (new Date() > sessionExpire) {
          logger.debug('JSON session has timed out');
          delete this.userSession[accessToken];
          reject({ error: 'JSON session has timed out' });
        } else {
          logger.debug('Get JSON session was successful');
          resolve({ username, accessToken });
        }
      } catch (error) {
        logger.error(`Unable to get JSON session: ${error}`);
        reject({ error });
      }
    });
  }

  killSession(accessToken) {
    logger.debug('Killing JSON session');
    
    return new Promise((resolve, reject) => {
      try {
        delete this.session[accessToken];
        logger.debug('JSON session was successfully killed');
        resolve();
      } catch (error) {
        logger.error(`Unable to kill JSON session: ${error}`);
        reject({ error });
      }
    });
  }
}

module.exports = JsonSession;
