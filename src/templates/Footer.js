import React from 'react';
import { Link, browserHistory } from 'react-router';

const Footer = function () {
  const style = {
    textDecoration: 'none',
    margin: '20px',
    color: 'black',
  };
  const cursorStyle = {
    cursor: 'pointer',
  };
  return (
    <footer className="print--hide" style={{
      position: 'absolute', left: 0, right: 0, overflow: 'hidden'
    }}>
    <h2 className="visuallyhidden">Footer links</h2>
        <div className="footer">
            <div className="wrapper">
                <nav>
                    <div className="footer-nav col-wrap">
                        <div className="col col--lg-one-third col--md-one-third">
                            <h3 className="footer-nav__heading">Help</h3>
                            <ul className="footer-nav__list">
                                <li className="footer-nav__item">
                                    <a style={cursorStyle} onClick={() => browserHistory.push('/Accessibility')}>Accessibility</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col col--lg-one-third col--md-one-third">
                            <h3 className="footer-nav__heading">About SBR</h3>
                            <ul className="footer-nav__list">
                                <li className="footer-nav__item">
                                    <a style={cursorStyle} onClick={() => browserHistory.push('/WhatIsSbr')}>What is SBR</a>
                                </li>
                                <li className="footer-nav__item">
                                    <a style={cursorStyle} onClick={() => browserHistory.push('/ContactUs')}>Contact us</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col col--lg-one-third col--md-one-third">
                            <h3 className="footer-nav__heading">Connect with us</h3>
                            <ul className="footer-nav__list">
                                <li className="footer-nav__item">
                                    <a href="https://public.govdelivery.com/accounts/UKONS/subscribers/new" className="icon--hide">Email</a>
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
