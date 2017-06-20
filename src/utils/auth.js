// @flow

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
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password})
    }).then( (response) => {
      if (response.status === 200){
        return response.json().then(function(json) {
          const token = json.jToken;
          sessionStorage.setItem('token', token);
          //send auth request to save token username pair
          callback(true,{token});
        });
      }
      return callback(false, { data: 'Unable to login.' });
    });
  },
  checkToken(token: String, callback: (success: boolean, data: ?{}) => void) {
    fetch('http://localhost:3001/checkToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token})
    }).then( (response) => {
      if (response.status === 200){
        return response.json().then(function(json) {
          const token = json.token;
          //send auth request to save token username pair
          callback(true,{token});
        });
      }
      return callback(false);
    });
  },
  /**
   * Logs the current user out
   */
  logout(callback: (success: boolean) => void) {
    const token: String = sessionStorage.token;
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
