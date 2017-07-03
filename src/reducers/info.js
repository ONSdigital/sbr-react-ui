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
import { SET_UI_INFO, SET_API_INFO, SET_DATA_INFO, SENDING_UI_REQUEST, SENDING_API_REQUEST, SENDING_DATA_REQUEST, SET_INFO_ERROR_MESSAGE } from '../constants/InfoConstants';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
  data: {
    lastUpdate: '',
  },
  ui: {
    version: '',
    lastUpdate: '',
    currentlySending: false,
  },
  api: {
    version: '',
    lastUpdate: '',
    currentlySending: false,
  },
};

// Takes care of changing the application state
function infoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_UI_INFO:
      return assign({}, state, {
        ...state,
        ui: {
          version: action.newState.version,
          lastUpdate: action.newState.lastUpdate,
          currentlySending: state.currentlySending,
        },
      });
    case SET_API_INFO:
      return assign({}, state, {
        ...state,
        api: {
          version: action.newState.version,
          lastUpdate: action.newState.lastUpdate,
          currentlySending: state.currentlySending,
        },
      });
    case SET_DATA_INFO:
      return assign({}, state, {
        ...state,
        data: {
          lastUpdate: action.newState.lastUpdate,
          currentlySending: state.currentlySending,
        },
      });
    case SENDING_UI_REQUEST:
      return assign({}, state, {
        ...state,
        ui: {
          lastUpdate: state.lastUpdate,
          version: state.version,
          currentlySending: action.sending,
        },
      });
    case SENDING_API_REQUEST:
      return assign({}, state, {
        ...state,
        api: {
          lastUpdate: state.lastUpdate,
          version: state.version,
          currentlySending: action.sending,
        },
      });
    case SENDING_DATA_REQUEST:
      return assign({}, state, {
        ...state,
        data: {
          lastUpdate: state.lastUpdate,
          currentlySending: action.sending,
        },
      });
    default:
      return state;
  }
}

export default infoReducer;
