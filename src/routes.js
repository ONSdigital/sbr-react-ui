import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import history from './history';
import reducer from './reducers/index';
import Home from './views/Home';
import Results from './views/Results';
import NotFound from './views/NotFound';
import Template from './templates/Template';
import Login from './views/Login';
import withSearch from './components/SearchHOC';
import withProfile from './components/ProfileHOC';
import EnterpriseProfile from './components/EnterpriseProfile';
import LegalUnitProfile from './components/LegalUnitProfile';
import LocalUnitProfile from './components/LocalUnitProfile';
import VATProfile from './components/VATProfile';
import CompanyProfile from './components/CompanyProfile';
import PAYEProfile from './components/PAYEProfile';

// Create the Redux store with the redux-thunk middleware (for async actions)
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// Create the store, adding in the start command for redux developer tools
const store = createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const entConfig = {
  unitType: 'ENT',
  unitName: 'Enterprise',
  colour: 'blue',
  idName: 'entref',
  nameKey: 'name',
};

const leuConfig = {
  unitType: 'LEU',
  unitName: 'Legal Unit',
  colour: 'teal',
  idName: 'UBRN',
  nameKey: 'businessName',
};

const louConfig = {
  unitType: 'LOU',
  unitName: 'Local Unit',
  colour: 'teal',
  idName: 'LURN',
  nameKey: 'name',
};

const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Template>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Home" component={withSearch(Home)} />
            <Route exact path="/Results" component={withSearch(Results)} />
            <Route exact path="/Results/Enterprise/:id" component={withSearch(withProfile(EnterpriseProfile, entConfig))} />
            <Route exact path="/Results/LocalUnit/:id" component={withSearch(withProfile(LocalUnitProfile, louConfig))} />
            <Route exact path="/Results/LegalUnit/:id" component={withSearch(withProfile(LegalUnitProfile, leuConfig))} />
            <Route exact path="/Results/VAT/:id" component={withSearch(withProfile(VATProfile))} />
            <Route exact path="/Results/PAYE/:id" component={withSearch(withProfile(PAYEProfile))} />
            <Route exact path="/Results/Company/:id" component={withSearch(withProfile(CompanyProfile))} />
            <Route component={NotFound} />
          </Switch>
        </Template>
      </div>
    </Router>
  </Provider>
);

export default Routes;
