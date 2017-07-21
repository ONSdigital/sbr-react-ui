import React from 'react';
import ONSLogo from '../resources/img/orglogo.svg';
import config from '../config/constants';
const ie = require('ie-version');

const { ENV } = config;

const Header = function () {
  // Once logged in, display ENV (local/dev/prod etc) in the header
  const onLoginPage = (location.pathname === '/' || location.pathname === 'Login');
  const header = (onLoginPage) ? 'Statistical Business Register' : ENV;
  let className1 = '';
  if (ie.version && ie.version <= 8) {
    className1 = <img className="logo" src="https://cdn.ons.gov.uk/assets/images/ons-logo/v2/ons-logo.png" alt="Office for National Statistics" />;
  } else {
    className1 = <img className="logo" src="https://cdn.ons.gov.uk/assets/images/ons-logo/v2/ons-logo.svg" alt="Office for National Statistics" />;
  }
  return (
    <div className="wrapper">
      <div className="header col-wrap">
        <div className="col col--lg-one-third col--md-one-third">
          <a href="/">
            {className1}
          </a>
        </div>
        <div className="col col--lg-two-thirds col--md-two-thirds print--hide">&nbsp;</div>
        <div className="secondary-nav col col--lg-two-thirds col--md-two-thirds print--hide">
          <ul className="secondary-nav__list">
            <li className="secondary-nav__item">
              <a className="secondary-nav__link" href="/methodology">Methodology</a>
            </li>
            <li className="secondary-nav__item">
              <a className="secondary-nav__link" href="/aboutus">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
