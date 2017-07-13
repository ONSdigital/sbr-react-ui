// @flow

import config from '../config/api-urls';

const { AUTH_URL } = config;

/**
 * Authentication lib
 * @type {Object}
 */
const auth = {
  /**
   * Logs a user in
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was logged in on the remote server
   */
  login(username: String, password: String, callback: (success: boolean, data: {}) => void) {
    // Do not need to check if user is already logged in, this is done in
    // routes.js before this method is called

    // POST to the backend with username/password
    fetch(`${AUTH_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          const token = json.jToken;
          const loginName = json.username;
          const role = json.role;
          sessionStorage.setItem('token', token);
          // Send auth request to save token username pair
          callback(true, { token, loginName, role });
        });
      }
      return callback(false, { message: 'Unable to login.' });
    })
    .catch(() => {
      return callback(false, { message: 'Server error: request timed out.' });
    });
  },
  checkToken(token: String, callback: (success: boolean, data: ?{}) => void) {
    fetch(`${AUTH_URL}/checkToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          const newToken = json.token;
          const username = json.username;
          const role = json.role;
          // Send auth request to save token username pair
          callback(true, { newToken, username, role });
        });
      }
      return callback(false);
    })
    .catch(() => {
      return callback(false, { message: 'Server error: request timed out.' });
    });
  },
  /**
   * Logs the current user out
   */
  logout(callback: (success: boolean) => void) {
    const token: String = sessionStorage.token;
    fetch(`${AUTH_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }).then((response) => {
      if (response.status === 200) {
        sessionStorage.clear();
        callback(true);
      }
    });
  },
  onChange() {},
};

module.exports = auth;
