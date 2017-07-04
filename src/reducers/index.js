import { combineReducers } from 'redux';
import login from './login';
import info from './info';
import apiSearch from './apiSearch';

export default combineReducers({
  login,
  info,
  apiSearch,
});
