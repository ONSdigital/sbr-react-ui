import React from 'react';
import ONSLogo from '../resources/img/orglogo.svg';
import config from '../config/constants';

const { ENV } = config;

const Header = function () {
  // Once logged in, display ENV (local/dev/prod etc) in the header
  const onLoginPage = (location.pathname === '/' || location.pathname === 'Login');
  const header = (onLoginPage) ? 'Statistical Business Register' : ENV;
  return (
    <div>
      <header role="banner" id="global-header">
        <div className="header-wrapper">
          <div className="header-global" style={{ marginBottom: '20px' }}>
            <div className="header-logo">
              <a href="https://www.ons.gov.uk/" aria-label="Link to ONS website" title="Go to the homepage" id="logo" className="content">
                <img
                  src={ONSLogo}
                  aria-label="ONS logo"
                  style={{ marginTop: '30px' }}
                  width="240"
                  alt="Office for National Statistics"
                />
              </a>
            </div>
            <div className="banner-text">
              <h1 style={{ marginTop: '25px' }}>
                {header}
              </h1>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
