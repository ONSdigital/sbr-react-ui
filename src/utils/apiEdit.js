import config from '../config/api-urls';

const { API_URL, API_VERSION } = config;

/**
 * API lib for making edits to the data (only Enterprise for now.)
 * @type {Object}
 */
const apiEdit = {
  /**
   * Edits an Enterprise
   * @param  {Function} callback Called with returned data (none for this request).
   */
  editEnterprise(id, body, callback) {
    fetch(`${API_URL}/${API_VERSION}/enterprises/${id}`, {
      method: 'POST',
      // Should be able to use the headers below, however a CORS issue prevents it
      // So we have to send the data as a String rather than as JSON
      // headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          callback(true, { response: response.headers, resp: response, message: json.message_en });
        });
      } else if (response.status >= 500 && response.status < 600) {
        return callback(false, { message: 'Server error: unable to make edit.', resp: response });
      }
      return callback(false, { message: 'Error: record not found.', resp: response });
    }).catch(() => {
      return callback(false, { message: 'Timeout: unable to make edit.' });
    });
  },
};

module.exports = apiEdit;
