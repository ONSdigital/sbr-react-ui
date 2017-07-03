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
import { SET_UI_INFO, SET_API_INFO, SET_DATA_INFO, SENDING_UI_REQUEST, SENDING_API_REQUEST, SENDING_DATA_REQUEST, SET_UI_ERROR_MESSAGE, SET_API_ERROR_MESSAGE, SET_DATA_ERROR_MESSAGE } from '../constants/InfoConstants';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
  data: {
    lastUpdate: '',
    currentlySending: false,
    errorMessage: 'another error',
  },
  ui: {
    version: '',
    lastUpdate: '',
    currentlySending: false,
    errorMessage: '',
  },
  api: {
    version: '',
    lastUpdate: '',
    currentlySending: false,
    errorMessage: 'test error',
  },
};

// Takes care of changing the application state
function infoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_UI_INFO:
      return assign({}, state, {
        ...state,
        ui: {
          ...state.ui,
          version: action.newState.version,
          lastUpdate: action.newState.lastUpdate,
        },
      });
    case SET_API_INFO:
      return assign({}, state, {
        ...state,
        api: {
          ...state.api,
          version: action.newState.version,
          lastUpdate: action.newState.lastUpdate,
        },
      });
    case SET_DATA_INFO:
      return assign({}, state, {
        ...state,
        data: {
          ...state.data,
          lastUpdate: action.newState.lastUpdate,
        },
      });
    case SENDING_UI_REQUEST:
      return assign({}, state, {
        ...state,
        ui: {
          ...state.ui,
          currentlySending: action.sending,
        },
      });
    case SENDING_API_REQUEST:
      return assign({}, state, {
        ...state,
        api: {
          ...state.api,
          currentlySending: action.sending,
        },
      });
    case SENDING_DATA_REQUEST:
      return assign({}, state, {
        ...state,
        data: {
          ...state.data,
          currentlySending: action.sending,
        },
      });
    case SET_UI_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        ui: {
          ...state.ui,
          errorMessage: action.message,
        },
      });
    case SET_API_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        api: {
          ...state.api,
          errorMessage: action.message,
        },
      });
    case SET_DATA_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        data: {
          ...state.data,
          errorMessage: action.message,
        },
      });
    default:
      return state;
  }
}

export default infoReducer;
