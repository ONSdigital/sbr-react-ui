// @flow

import config from '../config/api-urls';

const { API_URL, API_VERSION } = config;

/**
 * API lib for getting info (version/last updated etc.)
 * @type {Object}
 */
const apiSearch = {
  /**
   * Gets ref details from API, search on any type of ref.
   * @param  {Function} callback Called with returned data.
   */
  getRef(id: string, callback: (success: boolean, data: {}, response?: {}) => void) {
    fetch(`${API_URL}/${API_VERSION}/search?id=${id}`, {
      method: 'GET',
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          callback(true, { results: json, response: response.headers, resp: response });
        });
      } else if (response.status >= 500 && response.status < 600) {
        return callback(false, { message: 'Server error: unable to load data.', resp: response });
      }
      return callback(false, { message: 'Error: record not found.', resp: response });
    }).catch(() => {
      return callback(false, { message: 'Timeout: unable to load data.' });
    });
  },
  /**
   * Gets legal unit from API.
   * @param  {Function} callback Called with returned data.
   */
  getLegalUnitById(id: string, callback: (success: boolean, data: {}, response?: {}) => void) {
    fetch(`${API_URL}/${API_VERSION}/leus/${id}`, {
      method: 'GET',
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          callback(true, { results: json, response: response.headers, resp: response });
        });
      } else if (response.status >= 500 && response.status < 600) {
        return callback(false, { message: 'Server error: unable to load data.', resp: response });
      }
      return callback(false, { message: 'Error: record not found.', resp: response });
    }).catch(() => {
      return callback(false, { message: 'Timeout: unable to load data.' });
    });
  },
};

module.exports = apiSearch;
