import { browserHistory } from 'react-router';
import { SET_REF_RESULTS, SET_REF_HEADERS, SENDING_REF_REQUEST, SET_REF_QUERY, SET_REF_ERROR_MESSAGE } from '../constants/ApiConstants';
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
        console.log("data is")
        console.log("results: ",data.results[0])
        console.log(data.results.length)
        if (data.results.length === 1) {
          const source = data.results[0].UnitLink.unitType;
          const destination = getDestination(source);
          console.log("dest: ",destination)
          browserHistory.push(`/RefSearch/${destination}/${query}/0`);
        }
      } else {
        dispatch(setErrorMessage(SET_REF_ERROR_MESSAGE, data.message));
      }
      //searchHistory.addToHistory(data.resp);
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
