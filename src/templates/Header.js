import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Loader from 'halogen/PulseLoader';
import config from '../config/constants';
import { logout } from '../actions/LoginActions';
import UserDetailsModal from '../components/UserDetailsModal';
import InfoModal from '../components/InfoModal';

const ie = require('ie-version');

const { ENV } = config;

const Header = function (props) {
  // Once logged in, display ENV (local/dev/prod etc) in the header
  const onLoginPage = (location.pathname === '/' || location.pathname === 'Login');
  const header = (onLoginPage) ? 'Statistical Business Register' : ENV;
  let className1 = '';
  if (ie.version && ie.version <= 8) {
    className1 = <img className="logo" src="https://cdn.ons.gov.uk/assets/images/ons-logo/v2/ons-logo.png" alt="Office for National Statistics" />;
  } else {
    className1 = <img className="logo" src="https://cdn.ons.gov.uk/assets/images/ons-logo/v2/ons-logo.svg" alt="Office for National Statistics" />;
  }
  const spinner = (<Loader color="#FFFFFF" size="8px" margin="0px" />);
  const buttonContent = (props.data.currentlySending) ? spinner : 'Logout';
  const cursorStyle = {
    cursor: 'pointer',
  };
  function getHeaderItems() {
    return (<div className="secondary-nav col col--lg-two-thirds col--md-two-thirds print--hide">
      <ul className="secondary-nav__list">
        <li style={cursorStyle} className="secondary-nav__item">
          <UserDetailsModal username={props.data.username} role={props.data.role} />
        </li>
        <li style={cursorStyle} className="secondary-nav__item">
          <InfoModal />
        </li>
        <button onClick={!props.currentlySending ? () => props.dispatch(logout()) : null} aria-label="Logout button" loading={props.currentlySending} type="submit" className="btn btn--primary btn--thin">
          {buttonContent}
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

export default connect(select)(Header);
