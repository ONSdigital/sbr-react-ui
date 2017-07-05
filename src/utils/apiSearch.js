// @flow

import config from '../config/api-urls';

const { API_URL } = config;

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
    fetch(`${API_URL}/search/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          callback(true, { results: json, response: response.headers });
        });
      }
      return callback(false, { message: 'Server error: unable to load data.' });
    }).catch(() => {
      return callback(false, { message: 'Timeout: unable to load data' });
    });
  },
};

module.exports = apiSearch;
