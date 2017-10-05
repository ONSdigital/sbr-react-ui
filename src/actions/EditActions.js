import { SET_ENTERPRISE_EDIT_HEADERS, SET_ENTERPRISE_EDIT_ID, SENDING_ENTERPRISE_EDIT_REQUEST, SET_ENTERPRISE_EDIT_BODY, SET_ENTERPRISE_EDIT_ERROR_MESSAGE } from '../constants/EditConstants';
import { REFS } from '../constants/ApiConstants';
import apiEdit from '../utils/apiEdit';
import apiSearch from '../utils/apiSearch';
import { setResults } from './ApiActions';

/**
 * Edit an Enterprise
 */
export function editEnterprise(id, body) {
  return (dispatch) => {
    dispatch(setErrorMessage(SET_ENTERPRISE_EDIT_ERROR_MESSAGE, ''));
    dispatch(sendingRequest(SENDING_ENTERPRISE_EDIT_REQUEST, true));
    dispatch(setId(SET_ENTERPRISE_EDIT_ID, id));
    dispatch(setBody(SET_ENTERPRISE_EDIT_BODY, body));
    apiEdit.editEnterprise(id, body, (success, data) => {
      dispatch(sendingRequest(SENDING_ENTERPRISE_EDIT_REQUEST, false));
      if (success) {
        dispatch(setHeaders(SET_ENTERPRISE_EDIT_HEADERS, data.resp));
        apiSearch.getSpecificRefById(REFS['ENT'].apiEndpoint, id, (success1, data1) => {
          dispatch(sendingRequest(REFS['ENT'].setSending, false));
          if (success1) {
            dispatch(setResults(REFS['ENT'].setResults, {
              results: [data1.results],
            }));
            dispatch(setHeaders(REFS['ENT'].setHeaders, {
              headers: data1.response,
            }));
          } else {
            dispatch(setErrorMessage(REFS['ENT'].setError, data1.message));
          }
        });
        dispatch(setErrorMessage(SET_ENTERPRISE_EDIT_ERROR_MESSAGE, data.message));
      } else {
        dispatch(setHeaders(SET_ENTERPRISE_EDIT_HEADERS, data.resp));
        dispatch(setErrorMessage(SET_ENTERPRISE_EDIT_ERROR_MESSAGE, data.message));
      }
    });
  };
}

export function setBody(type, body) {
  return { type, body };
}

export function setId(type, id) {
  return { type, id };
}

export function setHeaders(type, headers) {
  return { type, headers };
}

export function sendingRequest(type, sending) {
  return { type, sending };
}

function setErrorMessage(type, message) {
  return { type, message };
}
