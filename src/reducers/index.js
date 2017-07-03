import { combineReducers } from 'redux';
import login from './login';
import info from './info';

export default combineReducers({
  login,
  info,
});
