import { browserHistory } from 'react-router';
import { SET_ENTERPRISE_EDIT_HEADERS, SET_ENTERPRISE_EDIT_ID, SENDING_ENTERPRISE_EDIT_REQUEST, SET_ENTERPRISE_EDIT_BODY, SET_ENTERPRISE_EDIT_ERROR_MESSAGE } from '../constants/EditConstants';
import apiEdit from '../utils/apiEdit';

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
        dispatch(setHeaders(SET_ENTERPRISE_EDIT_HEADERS, {
          headers: data.response,
        }));
        dispatch(setErrorMessage(SET_ENTERPRISE_EDIT_ERROR_MESSAGE, data.message));
      } else {
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

export function setHeaders(type, newState) {
  return { type, newState };
}

export function sendingRequest(type, sending) {
  return { type, sending };
}

function setErrorMessage(type, message) {
  return { type, message };
}
