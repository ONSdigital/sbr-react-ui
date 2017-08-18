/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import { browserHistory } from 'react-router';
import { SET_AUTH, USER_LOGOUT, SENDING_REQUEST, SET_ERROR_MESSAGE, SET_USER_DETAILS } from '../constants/LoginConstants';
import * as errorMessages from '../constants/MessageConstants';
import auth from '../utils/auth';
import { getUiInfo, getApiInfo } from '../actions/InfoActions';

/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */
export function login(username, password) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));

    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ username, password })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }

    auth.login(username, password, (success, data) => {
      // When the request is finished, hide the loading indicator
      dispatch(sendingRequest(false));
      dispatch(setAuthState(success));
      if (success) {
        // If the login worked, forward the user to the dashboard and clear the form
        dispatch(setUserState({
          username,
          role: data.role,
          apiKey: data.apiKey,
        }));
        dispatch(getUiInfo());
        dispatch(getApiInfo());
        forwardTo('/Home');
      } else {
        switch (data.type) {
          case 'user-doesnt-exist':
            dispatch(setErrorMessage(errorMessages.USER_NOT_FOUND));
            return;
          case 'password-wrong':
            dispatch(setErrorMessage(errorMessages.WRONG_PASSWORD));
            return;
          default:
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
        }
      }
    });
  };
}

/**
 * Check the users token
 */
export function checkAuth(token) {
  return (dispatch) => {
    auth.checkToken(token, (success, data) => {
      dispatch(setAuthState(success));
      if (!success) {
        sessionStorage.clear();
        forwardTo('/');
      } else if (success) {
        if (window.location.pathname === '/') {
          forwardTo('/Home');
        }
        dispatch(getUiInfo());
        dispatch(getApiInfo());
        dispatch(setUserState({
          username: data.username,
          role: data.role,
        }));
      }
    });
  };
}

/**
 * Logs the current user out
 */
export function logout() {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    auth.logout((success) => {
      if (success === true) {
        dispatch(sendingRequest(false));
        dispatch(setAuthState(false));
        dispatch(resetState(undefined));
        localStorage.clear();
        browserHistory.push('/');
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      }
    });
  };
}

export function resetState() {
  return { type: USER_LOGOUT };
}

/**
 * Sets the user details state of the application (username, role)
 * @param  {boolean} newState          The state of the user details
 * @param  {string}  newState.username The new text of the username
 * @param  {string}  newState.role     The new text of the user role
 * @param  {string}  newState.apiKey   The API key for the user
 * @return {object}                    Formatted action for the reducer to handle
 */
export function setUserState(newState) {
  return { type: SET_USER_DETAILS, newState };
}

/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState) {
  return { type: SET_AUTH, newState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}


/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
  return (dispatch) => {
    dispatch({ type: SET_ERROR_MESSAGE, message });

    // Remove the error message after 3 seconds
    setTimeout(() => {
      dispatch({ type: SET_ERROR_MESSAGE, message: '' });
    }, 3000);
  };
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
  browserHistory.push(location);
}


/**
 * Checks if any elements of a JSON object are empty
 * @param  {object} elements The object that should be checked
 * @return {boolean}         True if there are empty elements, false if there aren't
 */
function anyElementsEmpty(elements) {
  for (let i = 0; i < Object.keys(elements).length; i += 1) {
    if (elements[Object.keys(elements)[i]] === '') {
      return true;
    }
  }
  return false;
}
