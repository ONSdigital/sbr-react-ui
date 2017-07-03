// @flow

import config from '../config/api-urls';

const { AUTH_URL } = config;

/**
 * Authentication lib
 * @type {Object}
 */
const apiInfo = {
  /**
   * Gets version/lastUpdate info from the UI.
   * @param  {Function} callback Called with returned data.
   */
  getUiInfo(callback: (success: boolean, data: {}) => void) {
    fetch(`${AUTH_URL}/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          const version = json.version;
          const lastUpdate = json.lastUpdate;
          callback(true, { version, lastUpdate });
        });
      }
      return callback(false);
    });
  },
};

module.exports = apiInfo;
