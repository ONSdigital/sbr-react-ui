import config from '../config/api-urls';

const { REROUTE_URL, API_VERSION } = config;

/**
 * API lib for getting info (version/last updated etc.)
 * @type {Object}
 */
const apiSearch = {
  /**
   * Gets ref details from API, search on any type of ref.
   * @param  {Function} callback Called with returned data.
   */
  getRef(id, callback) {
    fetch(REROUTE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        method: 'GET',
        endpoint: `${API_VERSION}/search?id=${id}`,
      }),
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
   * Gets specific ref by id from API.
   * @param  {Function} callback Called with returned data.
   */
  getSpecificRefById(unitType, id, callback) {
    fetch(REROUTE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        method: 'GET',
        endpoint: `${API_VERSION}/${unitType}/${id}`,
      }),
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
   * Gets specific ref by id and period from API.
   * @param  {Function} callback Called with returned data.
   */
  getSpecificRefByIdAndPeriod(unitType, id, period, callback) {
    fetch(REROUTE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        method: 'GET',
        endpoint: `${API_VERSION}/periods/${period}/${unitType}/${id}`,
      }),
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
