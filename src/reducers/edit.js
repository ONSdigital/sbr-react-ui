import { SET_ENTERPRISE_EDIT_HEADERS, SET_ENTERPRISE_EDIT_ID, SENDING_ENTERPRISE_EDIT_REQUEST, SET_ENTERPRISE_EDIT_BODY, SET_ENTERPRISE_EDIT_ERROR_MESSAGE } from '../constants/EditConstants';

const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
  enterprise: {
    headers: [],
    id: '',
    body: '',
    currentlySending: false,
    errorMessage: '',
  },
};

// Takes care of changing the application state
function editReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ENTERPRISE_EDIT_ID:
      return assign({}, state, {
        ...state,
        enterprise: {
          ...state.enterprise,
          id: action.id,
        },
      });
    case SET_ENTERPRISE_EDIT_BODY:
      return assign({}, state, {
        ...state,
        enterprise: {
          ...state.enterprise,
          body: action.body,
        },
      });
    case SET_ENTERPRISE_EDIT_HEADERS:
      return assign({}, state, {
        ...state,
        enterprise: {
          ...state.enterprise,
          headers: action.newState.headers,
        },
      });
    case SENDING_ENTERPRISE_EDIT_REQUEST:
      return assign({}, state, {
        ...state,
        enterprise: {
          ...state.enterprise,
          currentlySending: action.sending,
        },
      });
    case SET_ENTERPRISE_EDIT_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        enterprise: {
          ...state.enterprise,
          errorMessage: action.message,
        },
      });
    default:
      return state;
  }
}

export default editReducer;
