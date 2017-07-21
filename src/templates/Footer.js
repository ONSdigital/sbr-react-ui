import React from 'react';
import { Link } from 'react-router';

const Footer = function () {
  const style = {
    textDecoration: 'none',
    margin: '20px',
    color: 'black',
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
                                    <a href="/help/accessibility">Accessibility</a>
                                </li>
                                <li className="footer-nav__item">
                                    <a href="/help/cookiesandprivacy">Cookies and privacy</a>
                                </li>
                                <li className="footer-nav__item">
                                    <a href="/help/termsandconditions">Terms and conditions</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col col--lg-one-third col--md-one-third">
                            <h3 className="footer-nav__heading">About ONS</h3>
                            <ul className="footer-nav__list">
                                <li className="footer-nav__item">
                                    <a href="/aboutus/whatwedo">What we do</a>
                                </li>
                                <li className="footer-nav__item">
                                    <a href="/aboutus/careers">Careers</a>
                                </li>
                                <li className="footer-nav__item">
                                    <a href="/aboutus/contactus">Contact us</a>
                                </li>
                                <li className="footer-nav__item">
                                    <a href="/news">News</a>
                                </li>
                                <li className="footer-nav__item">
                                    <a href="/aboutus/transparencyandgovernance/freedomofinformationfoi">Freedom of Information</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col col--lg-one-third col--md-one-third">
                            <h3 className="footer-nav__heading">Connect with us</h3>
                            <ul className="footer-nav__list">
                                <li className="footer-nav__item">
                                    <a href="https://twitter.com/ONS" className="icon--hide">Twitter</a>
                                </li>
                                <li className="footer-nav__item">
                                    <a href="https://www.facebook.com/ONS" className="icon--hide">Facebook</a>
                                </li>
                                <li className="footer-nav__item">
                                    <a href="https://www.linkedin.com/company/office-for-national-statistics" className="icon--hide">LinkedIn</a>
                                </li>
                                <li className="footer-nav__item">
                                    <a href="https://public.govdelivery.com/accounts/UKONS/subscribers/new" className="icon--hide">Email alerts</a>
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
