import { browserHistory } from 'react-router';
import { SET_CH_RESULTS, SET_CH_HEADERS, SENDING_CH_REQUEST, SET_CH_QUERY, SET_CH_ERROR_MESSAGE, SET_PAYE_RESULTS, SET_PAYE_HEADERS, SENDING_PAYE_REQUEST, SET_PAYE_QUERY, SET_PAYE_ERROR_MESSAGE, SET_VAT_RESULTS, SET_VAT_HEADERS, SENDING_VAT_REQUEST, SET_VAT_QUERY, SET_VAT_ERROR_MESSAGE, SET_ENTERPRISE_RESULTS, SET_ENTERPRISE_HEADERS, SENDING_ENTERPRISE_REQUEST, SET_ENTERPRISE_QUERY, SET_ENTERPRISE_ERROR_MESSAGE, SET_REF_RESULTS, SET_REF_HEADERS, SENDING_REF_REQUEST, SET_REF_QUERY, SET_REF_ERROR_MESSAGE, SET_LEGAL_UNIT_RESULTS, SET_LEGAL_UNIT_HEADERS, SENDING_LEGAL_UNIT_REQUEST, SET_LEGAL_UNIT_QUERY, SET_LEGAL_UNIT_ERROR_MESSAGE } from '../constants/ApiConstants';
import apiSearch from '../utils/apiSearch';
// import searchHistory from '../utils/searchHistory';
import { getDestination } from '../utils/helperMethods';

/**
 * Get info (version/last updated) from the Node server
 */
export function refSearch(query) {
  return (dispatch) => {
    dispatch(setErrorMessage(SET_REF_ERROR_MESSAGE, ''));
    dispatch(sendingRequest(SENDING_REF_REQUEST, true));
    dispatch(setResults(SET_REF_RESULTS, { results: [] }));
    dispatch(setQuery(SET_REF_QUERY, query));
    apiSearch.getRef(query, (success, data) => {
      dispatch(sendingRequest(SENDING_REF_REQUEST, false));
      if (success) {
        dispatch(setResults(SET_REF_RESULTS, {
          results: data.results,
        }));
        dispatch(setHeaders(SET_REF_HEADERS, {
          headers: data.response,
        }));
        if (data.results.length === 1) {
          const source = data.results[0].unitType;
          const destination = getDestination(source);
          browserHistory.push(`/RefSearch/${destination}/${query}/0`);
        }
      } else {
        dispatch(setErrorMessage(SET_REF_ERROR_MESSAGE, data.message));
      }
    });
  };
}

/**
 * Get specific unit by id
 */
export function getSpecificUnitType(unitType, id) {
  const constants = {
    enterprise: {
      url: 'ENT',
      setResults: SET_ENTERPRISE_RESULTS,
      setHeaders: SET_ENTERPRISE_HEADERS,
      setSending: SENDING_ENTERPRISE_REQUEST,
      setQuery: SET_ENTERPRISE_QUERY,
      setError: SET_ENTERPRISE_ERROR_MESSAGE,
    },
    leu: {
      url: 'LEU',
      setResults: SET_LEGAL_UNIT_RESULTS,
      setHeaders: SET_LEGAL_UNIT_HEADERS,
      setSending: SENDING_LEGAL_UNIT_REQUEST,
      setQuery: SET_LEGAL_UNIT_QUERY,
      setError: SET_LEGAL_UNIT_ERROR_MESSAGE,
    },
    vat: {
      url: 'VAT',
      setResults: SET_VAT_RESULTS,
      setHeaders: SET_VAT_HEADERS,
      setSending: SENDING_VAT_REQUEST,
      setQuery: SET_VAT_QUERY,
      setError: SET_VAT_ERROR_MESSAGE,
    },
    paye: {
      url: 'PAYE',
      setResults: SET_PAYE_RESULTS,
      setHeaders: SET_PAYE_HEADERS,
      setSending: SENDING_PAYE_REQUEST,
      setQuery: SET_PAYE_QUERY,
      setError: SET_PAYE_ERROR_MESSAGE,
    },
    ch: {
      url: 'CH',
      setResults: SET_CH_RESULTS,
      setHeaders: SET_CH_HEADERS,
      setSending: SENDING_CH_REQUEST,
      setQuery: SET_CH_QUERY,
      setError: SET_CH_ERROR_MESSAGE,
    },
  }
  return (dispatch) => {
    dispatch(setErrorMessage(constants[unitType].setError, ''));
    dispatch(sendingRequest(constants[unitType].setSending, true));
    dispatch(setResults(constants[unitType].setResults, { results: [] }));
    dispatch(setQuery(constants[unitType].setQuery, id));
    apiSearch.getLegalUnitById(id, (success, data) => {
      dispatch(sendingRequest(constants[unitType].setSending, false));
      if (success) {
        dispatch(setResults(constants[unitType].setResults, {
          results: [data.results],
        }));
        dispatch(setHeaders(constants[unitType].setHeaders, {
          headers: data.response,
        }));
        browserHistory.push(`/RefSearch/${constants[unitType].url}/${id}/0`);
      } else {
        dispatch(setErrorMessage(constants[unitType].setError, data.message));
      }
    });
  };
}

export function setResults(type, newState) {
  return { type, newState };
}

export function setQuery(type, query) {
  return { type, query };
}

export function setHeaders(type, newState) {
  return { type, newState };
}

export function sendingRequest(type, sending) {
  return { type, sending };
}

function setErrorMessage(type, message) {
  return { type, message };
}
