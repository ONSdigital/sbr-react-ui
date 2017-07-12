// @flow

import config from '../config/api-urls';

const { API_URL, API_VERSION } = config;

/**
 * API lib for getting info (version/last updated etc.)
 * @type {Object}
 */
const apiSearch = {
  /**
   * Gets version/lastUpdate info from the UI.
   * @param  {Function} callback Called with returned data.
   */
  getRef(id: string, callback: (success: boolean, data: {}) => void) {
    fetch(`${API_URL}/${API_VERSION}/suggest?id=${id}`, {
      method: 'GET',
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          callback(true, { results: json, response: response.headers });
        });
      } else if (response.status >= 500 && response.status < 600) {
        return callback(false, { message: 'Server error: unable to load data.' });
      }
      return callback(false, { message: 'Error: record not found.' });
    }).catch(() => {
      return callback(false, { message: 'Timeout: unable to load data.' });
    });
  },
};

module.exports = apiSearch;
