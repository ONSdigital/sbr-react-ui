import React from 'react';
import { Link } from 'react-router';

const Footer = function () {
  const cursorStyle = {
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
                  <li className="footer-nav__item">
                    <Link to="/Accessibility">
                      Accessibility
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col col--lg-one-third col--md-one-third">
                <h3 className="footer-nav__heading">About SBR</h3>
                <ul className="footer-nav__list">
                  <Link to="/WhatIsSbr">
                    What is SBR
                  </Link>
                </ul>
              </div>
              <div className="col col--lg-one-third col--md-one-third">
                <h3 className="footer-nav__heading">Connect with us</h3>
                <ul className="footer-nav__list">
                  <li className="footer-nav__item">
                    <a style={cursorStyle} onClick={() => window.location.href = 'mailto:statistical.business.register@ons.gov.uk?subject=SBR&body=message%20goes%20here'}>statistical.business.register@ons.gov.uk</a>
                  </li>
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
