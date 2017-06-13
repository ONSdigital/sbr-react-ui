/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import { CHECK_AUTH, SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE, SET_USER_DETAILS } from '../constants/AppConstants';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign;
import auth from '../utils/auth';

// The initial application state
const initialState = {
  userDetails: {
    username: '',
    role: '',
    apiKey: ''
  },
  currentlySending: false,
  loggedIn: auth.loggedIn(),
  errorMessage: ''
};

// Takes care of changing the application state
export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DETAILS:
      return assign({}, state, {
        userDetails: action.newState
      });
    case SET_AUTH:
      return assign({}, state, {
        loggedIn: action.newState
      });
    case CHECK_AUTH:
      return assign({}, state, {
        loggedIn: action.newState
      });
    case SENDING_REQUEST:
      return assign({}, state, {
        currentlySending: action.sending
      });
    case SET_ERROR_MESSAGE:
      return assign({}, state, {
        errorMessage: action.message
      });
    default:
      return state;
  }
}
