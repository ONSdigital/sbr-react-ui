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
  login(username, password, callback) {
    // Do not need to check if user is already logged in, this is done in
    // routes.js before this method is called

    // POST to the backend with username/password
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          const apiKey = json.apiKey;
          const role = json.role;
          const token = json.token;
          sessionStorage.setItem('token', token);
          // send auth request to save token username pair
          return callback(true, { apiKey, role, token });
        });
      }
      return callback(false, { data: 'Unable to login.' });
    });
  },
  checkToken(token, callback) {
    fetch('http://localhost:3001/checkToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          const apiKey = json.apiKey;
          const role = json.role;
          // send auth request to save token username pair
          return callback(true, { authenticated: true, apiKey, role });
        });
      }
      return callback(false);
    });
  },
  /**
   * Logs the current user out
   */
  logout(callback) {
    const token = sessionStorage.token;
    fetch('http://localhost:3001/logout', {
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
