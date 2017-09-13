import { browserHistory } from 'react-router';
import { REFS, SET_CH_RESULTS, SET_CH_HEADERS, SENDING_CH_REQUEST, SET_CH_QUERY, SET_CH_ERROR_MESSAGE, SET_PAYE_RESULTS, SET_PAYE_HEADERS, SENDING_PAYE_REQUEST, SET_PAYE_QUERY, SET_PAYE_ERROR_MESSAGE, SET_VAT_RESULTS, SET_VAT_HEADERS, SENDING_VAT_REQUEST, SET_VAT_QUERY, SET_VAT_ERROR_MESSAGE, SET_ENTERPRISE_RESULTS, SET_ENTERPRISE_HEADERS, SENDING_ENTERPRISE_REQUEST, SET_ENTERPRISE_QUERY, SET_ENTERPRISE_ERROR_MESSAGE, SET_REF_RESULTS, SET_REF_HEADERS, SENDING_REF_REQUEST, SET_REF_QUERY, SET_REF_ERROR_MESSAGE, SET_LEGAL_UNIT_RESULTS, SET_LEGAL_UNIT_HEADERS, SENDING_LEGAL_UNIT_REQUEST, SET_LEGAL_UNIT_QUERY, SET_LEGAL_UNIT_ERROR_MESSAGE } from '../constants/ApiConstants';
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
  return (dispatch) => {
    dispatch(setErrorMessage(REFS[unitType].setError, ''));
    dispatch(sendingRequest(REFS[unitType].setSending, true));
    dispatch(setResults(REFS[unitType].setResults, { results: [] }));
    dispatch(setQuery(REFS[unitType].setQuery, id));
    apiSearch.getSpecificRefById(REFS[unitType], id, (success, data) => {
      dispatch(sendingRequest(REFS[unitType].setSending, false));
      if (success) {
        dispatch(setResults(REFS[unitType].setResults, {
          results: [data.results],
        }));
        dispatch(setHeaders(REFS[unitType].setHeaders, {
          headers: data.response,
        }));
        browserHistory.push(`/RefSearch/${REFS[unitType].url}/${id}/0`);
      } else {
        dispatch(setErrorMessage(REFS[unitType].setError, data.message));
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
