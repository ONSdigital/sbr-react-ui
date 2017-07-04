import { SET_REF_RESULTS, SET_REF_HEADERS, SENDING_REF_REQUEST, SET_REF_QUERY, SET_REF_ERROR_MESSAGE } from '../constants/ApiConstants';
import apiSearch from '../utils/apiSearch';

/**
 * Get info (version/last updated) from the Node server
 */
export function refSearch(id) {
  return (dispatch) => {
    dispatch(sendingRequest(SENDING_REF_REQUEST, true));
    dispatch(setQuery(SET_REF_QUERY, id));
    apiSearch.getRef(id, (success, data) => {
      dispatch(sendingRequest(SENDING_REF_REQUEST, false));
      if (success) {
        dispatch(setResults(SET_REF_RESULTS, {
          results: data.results,
        }));
        //dispatch(setHeaders(SET_REF_HEADERS));
      } else {
        dispatch(setErrorMessage(SET_REF_ERROR_MESSAGE, data.message));
      }
    });
  };
}

export function setResults(type, newState) {
  return { type, newState };
}

export function setQuery(type, newState) {
  return { type, newState };
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
