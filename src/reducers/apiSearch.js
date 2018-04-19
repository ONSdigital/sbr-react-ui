import { SET_RESULTS, SET_UNIT_RESULT, SET_QUERY, SET_SEARCH_ERROR_MESSAGE, SENDING_SEARCH_REQUEST } from '../constants/ApiConstants';

const initialState = {
  results: [],
  query: '',
  currentlySending: false,
  errorMessage: '',
  units: {
    ENT: {},
    LEU: {},
    LOU: {},
    VAT: {},
    PAYE: {},
    CH: {},
  },
};

/**
 * @const searchReducer - The reducer to handle API search data
 *
 * @param {Object} state - This current reducer state
 * @param {Object} action - An action which holds the type and any data
 *
 * @return {Object} - The new state (after the action has been applied)
 */
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESULTS:
      return Object.assign({}, state, {
        ...state,
        results: action.results,
        capped: action.capped,
      });
    case SET_UNIT_RESULT:
      return Object.assign({}, state, {
        ...state,
        units: {
          ...state.units,
          [action.unitType]: action.result,
        },
      });
    case SENDING_SEARCH_REQUEST:
      return Object.assign({}, state, {
        ...state,
        currentlySending: action.sending,
      });
    case SET_QUERY:
      return Object.assign({}, state, {
        ...state,
        query: action.query,
      });
    case SET_SEARCH_ERROR_MESSAGE:
      return Object.assign({}, state, {
        ...state,
        errorMessage: action.message,
      });
    default:
      return state;
  }
};

export default searchReducer;
