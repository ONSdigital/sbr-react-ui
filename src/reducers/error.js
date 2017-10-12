import { REMOVE_LAST_ERROR, SET_PERIOD, SET_REF_RESULTS, SET_REF_HEADERS, SENDING_REF_REQUEST, SET_REF_QUERY, SET_REF_ERROR_MESSAGE, SET_ENTERPRISE_RESULTS, SET_ENTERPRISE_HEADERS, SENDING_ENTERPRISE_REQUEST, SET_ENTERPRISE_QUERY, SET_ENTERPRISE_ERROR_MESSAGE, SET_LEGAL_UNIT_RESULTS, SET_LEGAL_UNIT_HEADERS, SENDING_LEGAL_UNIT_REQUEST, SET_LEGAL_UNIT_QUERY, SET_LEGAL_UNIT_ERROR_MESSAGE, SET_VAT_RESULTS, SET_VAT_HEADERS, SENDING_VAT_REQUEST, SET_VAT_QUERY, SET_VAT_ERROR_MESSAGE, SET_PAYE_RESULTS, SET_PAYE_HEADERS, SENDING_PAYE_REQUEST, SET_PAYE_QUERY, SET_PAYE_ERROR_MESSAGE, SET_CH_RESULTS, SET_CH_HEADERS, SENDING_CH_REQUEST, SET_CH_QUERY, SET_CH_ERROR_MESSAGE } from '../constants/ApiConstants';
import periods from '../config/periods';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
  errorArray: [],
};

// Takes care of changing the application state
function errorReducer(state = initialState, action) {
  // Need to move this kind of logic out of the reducer?
  if (action.message !== '') {
    switch (action.type) {
      case SET_ENTERPRISE_ERROR_MESSAGE:
        return assign({}, state, {
          ...state,
          errorArray: [...state.errorArray, {
            type: 'ENT',
            timeStamp: action.timeStamp,
            message: action.message,
          }],
        });
      case SET_LEGAL_UNIT_ERROR_MESSAGE:
        return assign({}, state, {
          ...state,
          errorArray: [...state.errorArray, {
            type: 'LEU',
            timeStamp: action.timeStamp,
            message: action.message,
          }],
        });
      case SET_PAYE_ERROR_MESSAGE:
        return assign({}, state, {
          ...state,
          errorArray: [...state.errorArray, {
            type: 'PAYE',
            timeStamp: action.timeStamp,
            message: action.message,
          }],
        });
      case SET_VAT_ERROR_MESSAGE:
        return assign({}, state, {
          ...state,
          errorArray: [...state.errorArray, {
            type: 'VAT',
            timeStamp: action.timeStamp,
            message: action.message,
          }],
        });
      case SET_CH_ERROR_MESSAGE:
        return assign({}, state, {
          ...state,
          errorArray: [...state.errorArray, {
            type: 'CH',
            timeStamp: action.timeStamp,
            message: action.message,
          }],
        });
      case REMOVE_LAST_ERROR:
        return assign({}, state, {
          ...state,
          errorArray: state.errorArray.slice(0, state.errorArray.length - 1),
        });
      default:
        return state;
    }
  }
  return state;
}

export default errorReducer;
