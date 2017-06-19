import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from './views/Home.js';
import NotFound from './views/NotFound.js';
import Template from './templates/Template.js';
import Login from './views/Login.js';
import Help from './views/Help.js';
import Support from './views/Support.js';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import homeReducer from './reducers/reducers';
import { checkAuth } from './actions/AppActions';


// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(
  homeReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Redirect() is called on the Login page
// If the token exists in sessionStorage, checkAuth() is called
// which will authenticate the token with Node, which returns the
// username/role etc. The user is then redirected to /Home.
function redirect(nextState, replaceState) {
  if (sessionStorage['token']){
    store.dispatch(checkAuth(sessionStorage.token));
  }
}

function checkAuthentication(nextState, replaceState) {
  let { loggedIn } = store.getState();

  // check if the path isn't dashboard
  // that way we can apply specific logic
  // to display/render the path we want to
  if (nextState.location.pathname !== '/Home') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    } else {
      replaceState(null, '/');
    }
  } else {
    // If the user is already logged in, forward them to the homepage
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  }
}

const Routes = (props) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Template}>
      <IndexRoute component={Login} onEnter={redirect} />
        <Route onEnter={checkAuthentication} >
          <Route path={"Home"} component={Home}/>
          <Route path={"Help"} component={Help}/>
          <Route path={"Support"} component={Support}/>
          <Route path={"*"} component={NotFound}/>
        </Route>
      </Route>
    </Router>
  </Provider>
);

export default Routes;
