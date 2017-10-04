import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Home from './views/Home';
import NotFound from './views/NotFound';
import Template from './templates/Template';
import Login from './views/Login';
import ContactUs from './views/ContactUs';
import WhatIsSbr from './views/WhatIsSbr';
import Accessibility from './views/Accessibility';
import RefSearch from './views/RefSearch';
import EnterpriseView from './views/EnterpriseView';
import LegalUnitView from './views/LegalUnitView';
import CompanyView from './views/CompanyView';
import VATView from './views/VATView';
import PAYEView from './views/PAYEView';
import SearchHistory from './views/SearchHistory';
import UserDetails from './views/UserDetails';
import TechnicalInformation from './views/TechnicalInformation';
import reducer from './reducers/index';
import { checkAuth } from './actions/LoginActions';

// import config from './config/constants';
// const a11y = require('react-a11y');
// const { ENV } = config;
// This will put react-a11y warnings in the console
// Can use the following to cause errors:
// a11y(React, { throw: true });
// if (ENV === 'Local') a11y(React);

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(
  reducer,
  /* eslint no-underscore-dangle: "off" */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// checkAuthentication checks if there is a sessionStorage token in browser
// if there the token gets checked with the node server for authentication
// if no token is present, the user gets redirected back to the login.
function checkAuthentication(nextState, replaceState) {
  if (sessionStorage.token) {
    store.dispatch(checkAuth(sessionStorage.token));
  } else {
    replaceState(null, '/');
  }
}

function checkLogin() {
  if (sessionStorage.token) {
    store.dispatch(checkAuth(sessionStorage.token));
  }
}

/* eslint arrow-body-style: "off" */
const Routes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Template}>
        <IndexRoute component={Login} onEnter={checkLogin} />
        <Route onEnter={checkAuthentication} >
          <Route path={'/Home'} component={Home} />
          <Route path={'/RefSearch'} component={RefSearch} />
          <Route path={'/Enterprises/:enterprise'} component={EnterpriseView} />
          <Route path={'/LegalUnits/:legalUnit'} component={LegalUnitView} />
          <Route path={'/Vats/:vat'} component={VATView} />
          <Route path={'/Payes/:paye'} component={PAYEView} />
          <Route path={'/Companies/:company'} component={CompanyView} />
          <Route path={'/SearchHistory'} component={SearchHistory} />
          <Route path={'/WhatIsSbr'} component={WhatIsSbr} />
          <Route path={'/Accessibility'} component={Accessibility} />
          <Route path={'/ContactUs'} component={ContactUs} />
          <Route path={'/UserDetails'} component={UserDetails} />
          <Route path={'/TechnicalInformation'} component={TechnicalInformation} />
          <Route path={'/*'} component={NotFound} />
        </Route>
      </Route>
    </Router>
  </Provider>
);

export default Routes;
