import { browserHistory } from 'react-router';
import { REFS, SET_REF_RESULTS, SET_REF_HEADERS, SENDING_REF_REQUEST, SET_REF_QUERY, SET_REF_ERROR_MESSAGE } from '../constants/ApiConstants';
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
        dispatch(setResults(REFS[data.results[0].unitType].setResults, {
          results: data.results,
        }));
        dispatch(setHeaders(SET_REF_HEADERS, {
          headers: data.response,
        }));

        // If the unitType that is returned is not an ENT, do an additional
        // search to get that data
        if (data.results[0].unitType !== 'ENT') {
          console.log('sending........')
          apiSearch.getSpecificRefById(REFS['ENT'].apiEndpoint, data.results[0].parents['ENT'], (success, data) => {
            if (success) {
              dispatch(setResults(REFS['ENT'].setResults, {
                results: [data.results],
              }));
              dispatch(setHeaders(REFS['ENT'].setHeaders, {
                headers: data.response,
              }));
            } else {
              dispatch(setErrorMessage(REFS['ENT'].setError, data.message));
            }
          });
        }

        // if (data.results.length === 1) {
          const source = data.results[0].unitType;
          const destination = getDestination(source);
          browserHistory.push(`/${destination}/${query}`);
        // }
      } else {
        dispatch(setErrorMessage(SET_REF_ERROR_MESSAGE, data.message));
      }
    });
  };
}

/**
 * Get specific unit by id
 *
 * This is a generic method that can do a specific search for any REF type.
 */
export function getSpecificUnitType(unitType, id, redirect = false) {
  return (dispatch) => {
    dispatch(setErrorMessage(REFS[unitType].setError, ''));
    dispatch(sendingRequest(REFS[unitType].setSending, true));
    dispatch(setResults(REFS[unitType].setResults, { results: [] }));
    dispatch(setQuery(REFS[unitType].setQuery, id));
    apiSearch.getSpecificRefById(REFS[unitType].apiEndpoint, id, (success, data) => {
      dispatch(sendingRequest(REFS[unitType].setSending, false));
      if (success) {
        dispatch(setResults(REFS[unitType].setResults, {
          results: [data.results],
        }));
        dispatch(setHeaders(REFS[unitType].setHeaders, {
          headers: data.response,
        }));
        // If the user goes straight to /Enterprises/:id without going via
        // the search, we don't want to redirect them as they are already on
        // the correct page
        if (redirect) {
          browserHistory.push(`/${REFS[unitType].url}/${id}`);
        }
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
