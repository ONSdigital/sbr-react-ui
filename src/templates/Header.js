import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import Loader from 'halogen/PulseLoader';
import { logout } from '../actions/LoginActions';

const Header = function (props) {
  const spinner = (<Loader color="#FFFFFF" size="8px" margin="0px" />);
  const buttonContent = (props.data.currentlySending) ? spinner : 'Logout';
  function getHeaderItems() {
    return (
      <div className="secondary-nav col col--lg-two-thirds col--md-two-thirds print--hide">
        <ul className="secondary-nav__list js-nav-clone__list">
          <li className="secondary-nav__item">
            <Link className="secondary-nav__link  js-nav-clone__link" to="/UserDetails">User Details</Link>
          </li>
          <li className="secondary-nav__item">
            <Link className="secondary-nav__link  js-nav-clone__link" to="/TechnicalInformation">Information</Link>
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
            <img className="logo" src="https://cdn.ons.gov.uk/assets/images/ons-logo/v2/ons-logo.svg" alt="Office for National Statistics" />
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
