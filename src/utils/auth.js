/**
 * Authentication lib
 * @type {Object}
 */
var auth = {
  /**
   * Logs a user in
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was logged in on the remote server
   */
  login(username, password, callback) {
    // If there is a token in the localStorage, the user already is
    // authenticated


    // if (this.loggedIn()) {
    //   callback(true);
    //   return;
    // }

    // POST to the backend with username/password
    fetch("http://localhost:3001/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, password: password})
    }).then( (response) => {
      if (response.status === 200){
        return response.json().then(function(json) {
          const apiKey = json.apiKey;
          const role = json.role;
          const token = json.token;
          sessionStorage.setItem('token', token);
          //send auth request to save token username pair
          callback({authenticated: true,apiKey,role,token});
        });
      } else {
        callback(false, "Error");
      }
    });
  },
  old(token){
    // This method needs refactoring to be asynchronous
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST","http://localhost:3001/checkToken",false); // false for synchronous request
    // Only use Authorization header on deployed app, not locally
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({token: token}));
    if (xmlHttp.status === 200){
      return [true];
    } else {
      return [false];
    }
  },
  checkToken(token,callback){
    fetch("http://localhost:3001/checkToken", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token})
    }).then( (response) => {
      if (response.status === 200){
        return response.json().then(function(json) {
          const apiKey = json.apiKey;
          const role = json.role;
          const token = json.token;
          //send auth request to save token username pair
          callback(true,{authenticated: true,apiKey,role,token});
        });
      } else {
        callback(false);
      }
    });
  },
  /**
   * Logs the current user out
   */
  logout(callback) {
    //const obj = JSON.parse(sessionStorage.user);
    // request.post('/logout', {}, () => {
    //   callback(true);
    // });
    const token = sessionStorage.token;
    //const username = store.getState().userDetails.username;
    fetch("http://localhost:3001/logout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token})
    }).then( (response) => {
      if (response.status === 200){
        sessionStorage.clear();
        callback(true);
      }
    });
  },
  /**
   * Checks if anybody is logged in
   * @return {boolean} True if there is a logged in user, false if there isn't
   */
  loggedIn() {
    const token = sessionStorage.token;
    if (token !== undefined) {
      // this.checkToken(token, (success, data) => {
      //   console.log("send req")
      //   console.log(success)
      //   if (success) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // });
      var t = this.old(token);
      return t;
    } else {
      return false;
    }
  },
  onChange() {}
}

module.exports = auth;
