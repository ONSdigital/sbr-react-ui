import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ONSLogo from '../resources/img/orglogo.svg';
import config from '../config/constants';
import { logout } from '../actions/LoginActions';
const ie = require('ie-version');
import UserDetailsModal from '../components/UserDetailsModal';
import TestModal from '../components/TestModal';
import InfoModal from '../components/InfoModal';

const { ENV } = config;

const Header = function ( props ) {
  // Once logged in, display ENV (local/dev/prod etc) in the header
  const onLoginPage = (location.pathname === '/' || location.pathname === 'Login');
  const header = (onLoginPage) ? 'Statistical Business Register' : ENV;
  let className1 = '';
  if (ie.version && ie.version <= 8) {
    className1 = <img className="logo" src="https://cdn.ons.gov.uk/assets/images/ons-logo/v2/ons-logo.png" alt="Office for National Statistics" />;
  } else {
    className1 = <img className="logo" src="https://cdn.ons.gov.uk/assets/images/ons-logo/v2/ons-logo.svg" alt="Office for National Statistics" />;
  }
  function getHeaderItems() {
    return (<div className="secondary-nav col col--lg-two-thirds col--md-two-thirds print--hide">
      <ul className="secondary-nav__list">
        <li className="secondary-nav__item">
          <TestModal username={props.data.username} role={props.data.role} />
        </li>
        <li className="secondary-nav__item">
          <InfoModal />
        </li>
        <button className="btn btn--primary btn--thin" onClick={() => props.dispatch(logout())}>
          Logout
        </button>
      </ul>
    </div>);
  }
  const div = (props.data.loggedIn) ? getHeaderItems() : '';
  return (
    <div className="wrapper">
      <div className="header col-wrap">
        <div className="col col--lg-one-third col--md-one-third">
          <a onClick={() => browserHistory.push('/Home')} style={{ cursor: 'pointer' }}>
            {className1}
          </a>
        </div>
        <div className="col col--lg-two-thirds col--md-two-thirds print--hide">&nbsp;</div>
        {div}
      </div>
    </div>
  );
};

function select(state) {
  return {
    data: state.login,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Header);
