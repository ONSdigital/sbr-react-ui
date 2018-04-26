import { SET_RESULTS, SET_UNIT_RESULT, SET_SEARCH_ERROR_MESSAGE, SENDING_SEARCH_REQUEST, SET_QUERY } from '../constants/ApiConstants';
import accessAPI from '../utils/accessAPI';
import config from '../config/api-urls';
import history from '../history';

const { REROUTE_URL, API_VERSION } = config;

const sendingRequest = (type, sending) => ({ type, sending });
const setErrorMessage = (type, message) => ({ type, message });
const setUnitResult = (unitType, result) => ({ type: SET_UNIT_RESULT, unitType, result  });
const resetResults = () => ({ type: SET_RESULTS, results: [] });
const setResults = (type, results, capped) => ({ type, results, capped });
const setQuery = (type, query) => ({ type, query });


const units = {
  ENT: 'Enterprise',
  LEU: 'LegalUnit',
  LOU: 'LocalUnit',
  VAT: 'VAT',
  PAYE: 'PAYE',
  CH: 'Company',
};

const apiUnits = {
  ENT: 'ents',
  LEU: 'leus',
  LOU: 'lous',
  VAT: 'vats',
  PAYE: 'payes',
  CH: 'crns',
};


/**
 * @const search - This is an async action that will handle the whole process
 * of doing a search, including setting spinners/error messages and the results.
 *
 * @param {Object} query - THe query object
 * @param {Function} formQuery - A function to transform the query object a string
 * @param {Boolean} redirect - Whether or not to go to /Results after the search
 */
const search = (query, redirect) => (dispatch) => {
  dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, ''));
  dispatch(sendingRequest(SENDING_SEARCH_REQUEST, true));
  dispatch(setResults(SET_RESULTS, [], ''));
  dispatch(setQuery(SET_QUERY, query));

  accessAPI(REROUTE_URL, 'POST', sessionStorage.accessToken, JSON.stringify({
    method: 'GET',
    endpoint: `${API_VERSION}/search?id=${query}`,
  }), 'search').then(response => response.json()).then(json => {
    if (json.length === 1) {
      // Since there is only one result, we can go directly to the profile page
      const unitType = json[0].unitType;
      const id = json[0].id;
      dispatch(setUnitResult(unitType, json[0]));

      // If the unit is a grandchild, it will not have a the grandparent
      // Enterprise in the parents, so we need to do another search
      if (unitType === 'PAYE' || unitType === 'VAT' || unitType === 'CH') {
        accessAPI(REROUTE_URL, 'POST', sessionStorage.accessToken, JSON.stringify({
          method: 'GET',
          endpoint: `${API_VERSION}/periods/${json[0].period}/leus/${json[0].parents.LEU}`,
        }), 'search').then(response => response.json()).then(leuJson => {
          // We save the result as this means that whenever the user uses the
          // bread crumb to navigate to a parent LEU or ENT, a request won't have
          // to be sent.
          dispatch(setUnitResult('LEU', leuJson));
          accessAPI(REROUTE_URL, 'POST', sessionStorage.accessToken, JSON.stringify({
            method: 'GET',
            endpoint: `${API_VERSION}/periods/${leuJson.period}/ents/${leuJson.parents.ENT}`,
          }), 'search').then(response => response.json()).then(entJson => {
            dispatch(setUnitResult('ENT', entJson));
          }).catch(msg => {
            dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
            dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, msg.toString()));
          });
        }).catch(msg => {
          dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
          dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, msg.toString()));
        });
      } else if (unitType === 'LEU' || unitType === 'LOU') {
        accessAPI(REROUTE_URL, 'POST', sessionStorage.accessToken, JSON.stringify({
          method: 'GET',
          endpoint: `${API_VERSION}/periods/${json[0].period}/ents/${json[0].parents.ENT}`,
        }), 'search').then(response => response.json()).then(entJson => {
          // We save the result as this means that whenever the user uses the
          // bread crumb to navigate to a parent LEU or ENT, a request won't have
          // to be sent.
          dispatch(setUnitResult('ENT', entJson));
          dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
        }).catch(msg => {
          dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
          dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, msg.toString()));
        });
      }
      dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
      if (redirect) history.push(`/Results/Period/${json[0].period}/${units[unitType]}/${id}`);
    } else if (json.length > 1) {
      // We have multiple results, so either a business/postcode has been searched
      // for, or there is a conflicting ID (e.g. if a LEU and VAT record have
      // the same ID's)
      dispatch(setResults(SET_RESULTS, json));
      dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
      if (redirect) history.push('/Results');
    } else {
      dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
      dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, 'Error parsing results from the API.'));
    }
  }).catch(msg => {
    dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
    dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, msg.toString()));
  });
};


/**
 * @const getUnitForPeriod - This is an async action that will search the API
 * for an id for a specific unit type and period.
 *
 * @param {String} id - The ID of the unit to search (UBRN/ERN etc.)
 * @param {String} unitType - The unit type e.g. ENT or LEU
 * @param {String} period - The period to search, e.g. 201802
 * @param {Boolean} redirect - Whether to redirect the user to the results page
 */
const getUnitForPeriod = (id, unitType, period, redirect) => (dispatch) => {
  dispatch(setErrorMessage(SET_SEARCH_ERROR_MESSAGE, ''));
  dispatch(sendingRequest(SENDING_SEARCH_REQUEST, true));

  accessAPI(REROUTE_URL, 'POST', sessionStorage.accessToken, JSON.stringify({
    method: 'GET',
    endpoint: `${API_VERSION}/periods/${period}/${apiUnits[unitType]}/${id}`,
  }), 'getUnitForPeriod').then(response => response.json()).then(json => {
    dispatch(setUnitResult(unitType, json));
    dispatch(sendingRequest(SENDING_SEARCH_REQUEST, false));
    if (redirect) history.push(`/Results/Period/${json.period}/${units[unitType]}/${id}`);
  });
};


export { search, getUnitForPeriod, setUnitResult, resetResults, setResults, setQuery };
