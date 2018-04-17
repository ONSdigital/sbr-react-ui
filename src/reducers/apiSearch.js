import { SET_PERIOD, REMOVE_LAST_ERROR, ADD_MOST_RECENT_ERROR, SET_REF_RESULTS, SET_REF_HEADERS, SENDING_REF_REQUEST, SET_REF_QUERY, SET_REF_ERROR_MESSAGE, SET_ENTERPRISE_RESULTS, SET_ENTERPRISE_HEADERS, SENDING_ENTERPRISE_REQUEST, SET_ENTERPRISE_QUERY, SET_ENTERPRISE_ERROR_MESSAGE, SET_LEGAL_UNIT_RESULTS, SET_LEGAL_UNIT_HEADERS, SENDING_LEGAL_UNIT_REQUEST, SET_LEGAL_UNIT_QUERY, SET_LEGAL_UNIT_ERROR_MESSAGE, SET_VAT_RESULTS, SET_VAT_HEADERS, SENDING_VAT_REQUEST, SET_VAT_QUERY, SET_VAT_ERROR_MESSAGE, SET_PAYE_RESULTS, SET_PAYE_HEADERS, SENDING_PAYE_REQUEST, SET_PAYE_QUERY, SET_PAYE_ERROR_MESSAGE, SET_CH_RESULTS, SET_CH_HEADERS, SENDING_CH_REQUEST, SET_CH_QUERY, SET_CH_ERROR_MESSAGE, SET_LOCAL_UNIT_RESULTS, SET_LOCAL_UNIT_ERROR_MESSAGE, SET_LOCAL_UNIT_HEADERS, SENDING_LOCAL_UNIT_REQUEST, SET_LOCAL_UNIT_QUERY } from '../constants/ApiConstants';
import periods from '../config/periods';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
  period: periods.DEFAULT_PERIOD,
  errorArray: [],
  refSearch: {
    results: [],
    headers: [],
    query: '',
    currentlySending: false,
    errorMessage: '',
    timeStamp: '',
  },
  enterprise: {
    results: [],
    headers: [],
    query: '',
    currentlySending: false,
    errorMessage: '',
    timeStamp: '',
  },
  legalUnit: {
    results: [],
    headers: [],
    query: '',
    currentlySending: false,
    errorMessage: '',
    timeStamp: '',
  },
  localUnit: {
    results: [],
    headers: [],
    query: '',
    currentlySending: false,
    errorMessage: '',
    timeStamp: '',
  },
  vat: {
    results: [],
    headers: [],
    query: '',
    currentlySending: false,
    errorMessage: '',
    timeStamp: '',
  },
  paye: {
    results: [],
    headers: [],
    query: '',
    currentlySending: false,
    errorMessage: '',
    timeStamp: '',
  },
  ch: {
    results: [],
    headers: [],
    query: '',
    currentlySending: false,
    errorMessage: '',
    timeStamp: '',
  },
};

// Takes care of changing the application state
function refReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_LAST_ERROR:
      return assign({}, state, {
        ...state,
        errorArray: state.errorArray.slice(0, state.errorArray.length - 1),
      });
    case ADD_MOST_RECENT_ERROR:
      return assign({}, state, {
        ...state,
        errorArray: [...state.errorArray, {
          unitType: action.unitType,
          timeStamp: action.timeStamp,
          errorMessage: action.errorMessage,
        }],
      });
    case SET_REF_RESULTS:
      return assign({}, state, {
        ...state,
        refSearch: {
          ...state.refSearch,
          results: action.newState.results,
        },
      });
    case SET_ENTERPRISE_RESULTS:
      return assign({}, state, {
        ...state,
        enterprise: {
          ...state.enterprise,
          results: action.newState.results,
        },
      });
    case SET_LEGAL_UNIT_RESULTS:
      return assign({}, state, {
        ...state,
        legalUnit: {
          ...state.legalUnit,
          results: action.newState.results,
        },
      });
    case SET_LOCAL_UNIT_RESULTS:
      return assign({}, state, {
        ...state,
        localUnit: {
          ...state.localUnit,
          results: action.newState.results,
        },
      });
    case SET_VAT_RESULTS:
      return assign({}, state, {
        ...state,
        vat: {
          ...state.vat,
          results: action.newState.results,
        },
      });
    case SET_PAYE_RESULTS:
      return assign({}, state, {
        ...state,
        paye: {
          ...state.paye,
          results: action.newState.results,
        },
      });
    case SET_CH_RESULTS:
      return assign({}, state, {
        ...state,
        ch: {
          ...state.ch,
          results: action.newState.results,
        },
      });
    case SET_PERIOD:
      return assign({}, state, {
        ...state,
        period: action.period,
      });
    case SET_REF_HEADERS:
      return assign({}, state, {
        ...state,
        refSearch: {
          ...state.refSearch,
          headers: action.newState.headers,
        },
      });
    case SET_ENTERPRISE_HEADERS:
      return assign({}, state, {
        ...state,
        enterprise: {
          ...state.enterprise,
          headers: action.newState.headers,
        },
      });
    case SET_LEGAL_UNIT_HEADERS:
      return assign({}, state, {
        ...state,
        legalUnit: {
          ...state.legalUnit,
          headers: action.newState.headers,
        },
      });
    case SET_LOCAL_UNIT_HEADERS:
      return assign({}, state, {
        ...state,
        localUnit: {
          ...state.localUnit,
          headers: action.newState.headers,
        },
      });
    case SET_VAT_HEADERS:
      return assign({}, state, {
        ...state,
        vat: {
          ...state.vat,
          headers: action.newState.headers,
        },
      });
    case SET_PAYE_HEADERS:
      return assign({}, state, {
        ...state,
        paye: {
          ...state.paye,
          headers: action.newState.headers,
        },
      });
    case SET_CH_HEADERS:
      return assign({}, state, {
        ...state,
        ch: {
          ...state.ch,
          headers: action.newState.headers,
        },
      });
    case SENDING_REF_REQUEST:
      return assign({}, state, {
        ...state,
        refSearch: {
          ...state.refSearch,
          currentlySending: action.sending,
        },
      });
    case SENDING_ENTERPRISE_REQUEST:
      return assign({}, state, {
        ...state,
        enterprise: {
          ...state.enterprise,
          currentlySending: action.sending,
        },
      });
    case SENDING_LEGAL_UNIT_REQUEST:
      return assign({}, state, {
        ...state,
        legalUnit: {
          ...state.legalUnit,
          currentlySending: action.sending,
        },
      });
    case SENDING_LOCAL_UNIT_REQUEST:
      return assign({}, state, {
        ...state,
        localUnit: {
          ...state.localUnit,
          currentlySending: action.sending,
        },
      });
    case SENDING_VAT_REQUEST:
      return assign({}, state, {
        ...state,
        vat: {
          ...state.vat,
          currentlySending: action.sending,
        },
      });
    case SENDING_PAYE_REQUEST:
      return assign({}, state, {
        ...state,
        paye: {
          ...state.paye,
          currentlySending: action.sending,
        },
      });
    case SENDING_CH_REQUEST:
      return assign({}, state, {
        ...state,
        ch: {
          ...state.ch,
          currentlySending: action.sending,
        },
      });
    case SET_REF_QUERY:
      return assign({}, state, {
        ...state,
        refSearch: {
          ...state.refSearch,
          query: action.query,
        },
      });
    case SET_ENTERPRISE_QUERY:
      return assign({}, state, {
        ...state,
        enterprise: {
          ...state.enterprise,
          query: action.query,
        },
      });
    case SET_LEGAL_UNIT_QUERY:
      return assign({}, state, {
        ...state,
        legalUnit: {
          ...state.legalUnit,
          query: action.query,
        },
      });
    case SET_LOCAL_UNIT_QUERY:
      return assign({}, state, {
        ...state,
        localUnit: {
          ...state.localUnit,
          query: action.query,
        },
      });
    case SET_VAT_QUERY:
      return assign({}, state, {
        ...state,
        vat: {
          ...state.vat,
          query: action.query,
        },
      });
    case SET_PAYE_QUERY:
      return assign({}, state, {
        ...state,
        paye: {
          ...state.paye,
          query: action.query,
        },
      });
    case SET_CH_QUERY:
      return assign({}, state, {
        ...state,
        ch: {
          ...state.ch,
          query: action.query,
        },
      });
    case SET_REF_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        refSearch: {
          ...state.refSearch,
          errorMessage: action.message,
          timeStamp: action.timeStamp,
        },
      });
    case SET_ENTERPRISE_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        enterprise: {
          ...state.enterprise,
          errorMessage: action.message,
          timeStamp: action.timeStamp,
        },
      });
    case SET_LEGAL_UNIT_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        legalUnit: {
          ...state.legalUnit,
          errorMessage: action.message,
          timeStamp: action.timeStamp,
        },
      });
    case SET_LOCAL_UNIT_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        localUnit: {
          ...state.localUnit,
          errorMessage: action.message,
          timeStamp: action.timeStamp,
        },
      });
    case SET_PAYE_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        paye: {
          ...state.paye,
          errorMessage: action.message,
          timeStamp: action.timeStamp,
        },
      });
    case SET_VAT_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        vat: {
          ...state.vat,
          errorMessage: action.message,
          timeStamp: action.timeStamp,
        },
      });
    case SET_CH_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        ch: {
          ...state.ch,
          errorMessage: action.message,
          timeStamp: action.timeStamp,
        },
      });
    default:
      return state;
  }
}

export default refReducer;
