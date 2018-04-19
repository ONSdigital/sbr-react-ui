import { SET_RESULTS, SET_UNIT_RESULT, SET_SEARCH_ERROR_MESSAGE, SENDING_SEARCH_REQUEST, SET_QUERY } from '../constants/ApiConstants';
import accessAPI from '../utils/accessAPI';
import config from '../config/api-urls';
import history from '../history';

const { REROUTE_URL, API_VERSION } = config;

const sendingRequest = (type, sending) => ({ type, sending });
const setErrorMessage = (type, message) => ({ type, message });

export const setUnitResult = (unitType, result) => ({ type: SET_UNIT_RESULT, unitType, result  });
export const resetResults = () => ({ type: SET_RESULTS, results: [] });
export const setResults = (type, results, capped) => ({ type, results, capped });
export const setQuery = (type, query) => ({ type, query });

const units = {
  ENT: 'Enterprise',
  LEU: 'LegalUnit',
  LOU: 'LocalUnit',
  VAT: 'VAT',
  PAYE: 'PAYE',
  CH: 'Company',
};

/**
 * @const search - This is an async action that will handle the whole process
 * of doing a search, including setting spinners/error messages and the results.
 *
 * @param {Object} query - THe query object
 * @param {Function} formQuery - A function to transform the query object a string
 * @param {Boolean} redirect - Whether or not to go to /Results after the search
 */
export const search = (query, redirect) => (dispatch) => {
  dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, ''));
  dispatch(sendingRequest(SENDING_SEARCH_REQUEST, true));
  dispatch(setResults(SET_RESULTS, [], ''));
  dispatch(setQuery(SET_QUERY, query));

  accessAPI(REROUTE_URL, 'POST', sessionStorage.accessToken, JSON.stringify({
    method: 'GET',
    endpoint: `${API_VERSION}/search?id=${query}`,
  }), 'search').then(response => response.json()).then(json => {
    dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
    if (json.length === 1) {
      // Since there is only one result, we can go directly to the profile page
      const unitType = json[0].unitType;
      const id = json[0].id;
      dispatch(setUnitResult(unitType, json[0]));
      if (redirect) history.push(`/Results/${units[unitType]}/${id}`);
    } else if (json.length > 1) {
      // We have multiple results, so either a business/postcode has been searched
      // for, or there is a conflicting ID (e.g. if a LEU and VAT record have
      // the same ID's)
      dispatch(setResults(SET_RESULTS, json));
      if (redirect) history.push('/Results');
    } else {
      dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, 'Error parsing results from the API.'));
    }
  }).catch(msg => {
    dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
    dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, msg.toString()));
  });
};
