import { SET_UI_INFO, SET_API_INFO, SET_DATA_INFO, SENDING_UI_REQUEST, SENDING_API_REQUEST, SENDING_DATA_REQUEST, SET_UI_ERROR_MESSAGE, SET_API_ERROR_MESSAGE, SET_DATA_ERROR_MESSAGE } from '../constants/InfoConstants';
import * as errorMessages from '../constants/MessageConstants';
import apiInfo from '../utils/apiInfo';

/**
 * Check the users token
 */
export function getUiInfo() {
  return (dispatch) => {
    dispatch(sendingRequest(SENDING_UI_REQUEST, true));
    apiInfo.getUiInfo((success, data) => {
      dispatch(sendingRequest(SENDING_UI_REQUEST, false));
      if (success) {
        dispatch(setInfo(SET_UI_INFO, {
          version: data.version,
          lastUpdate: data.lastUpdate,
        }));
      } else {
        dispatch(setErrorMessage(SET_UI_ERROR_MESSAGE, errorMessages.GENERAL_ERROR));
      }
    });
  };
}

export function setInfo(type, newState) {
  return { type, newState };
}

export function sendingRequest(type, sending) {
  return { type, sending };
}

function setErrorMessage(type, message) {
  return { type, message };
}
