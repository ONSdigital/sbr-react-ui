import React from 'react';
import { Link } from 'react-router';

const Footer = function () {
  const footerItemStyle = {
    textDecoration: 'underline',
    color: 'white',
  };
  const footerMailToStyle = {
    textDecoration: 'underline',
    color: 'white',
    cursor: 'pointer',
  };
  return (
    <footer className="print--hide" style={{ position: 'absolute', left: 0, right: 0, overflow: 'hidden' }}>
      <h2 className="visuallyhidden">Footer links</h2>
      <div className="footer">
        <div className="wrapper">
          <nav>
            <div className="footer-nav col-wrap">
              <div className="col col--lg-one-third col--md-one-third">
                <h3 className="footer-nav__heading">Help</h3>
                <ul className="footer-nav__list">
                  <Link to="/Accessibility">
                    <li className="footer-nav__item" style={footerItemStyle}>
                      Accessibility
                    </li>
                  </Link>
                  <Link to="/searchHistory">
                    <li className="footer-nav__item" style={footerItemStyle}>
                      Search History
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="col col--lg-one-third col--md-one-third">
                <h3 className="footer-nav__heading">About SBR</h3>
                <Link to="/WhatIsSbr">
                  <ul className="footer-nav__list" style={footerItemStyle}>
                    What is SBR
                  </ul>
                </Link>
              </div>
              <div className="col col--lg-one-third col--md-one-third">
                <h3 className="footer-nav__heading">Connect with us</h3>
                <ul className="footer-nav__list" style={footerMailToStyle} onClick={() => window.location.href = 'mailto:statistical.business.register@ons.gov.uk?subject=SBR&body=message%20goes%20here'}>
                  statistical.business.register@ons.gov.uk
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
