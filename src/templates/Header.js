import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LinkButton from '../patterns/LinkButton';
import { logout } from '../actions/LoginActions';
import ONSLogo from '../resources/img/logo.svg';

/**
 * @const Header - The header, including ONS logo and sign out button
 *
 * Depending on the current route, slight changes are made to this
 * component, e.g. show smaller title text whilst on /Results.
 */
const Header = ({ loggedIn, currentlySending, location, dispatch, history }) => {
  const headerText = (location.pathname.includes('/Results'))
  ? (<p className="saturn main_heading_sub_page">Statistical Business Register</p>)
  : (<h1 className="jupiter main_heading">Statistical Business Register</h1>);
  return (
    <header className="page__header">
      <div className="logo_container">
        <div className="wrapper">
          <div className="group">
            <div className="col-7">
              <div className="logo_header">
                <a onClick={() => history.push('/Home')} style={{ cursor: 'pointer' }}>
                  <img src={ONSLogo} alt="Office for National Statistics" className="logo__img" />
                </a>
              </div>
            </div>
            <div className="col-5">
              <div className="header_links">
                {/* If the user is logged in, we show their username and a sign out button (shown as a link) */}
                {loggedIn &&
                  <ul className="menubar" role="menubar" id="appmenu">
                    <li className="menubar" role="menuitem">
                      <LinkButton id="logoutLink" className="username" text="Sign out" onClick={() => dispatch(logout())} loading={currentlySending} />
                    </li>
                  </ul>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page_title">
        <div className="wrapper">
          <div className="group">
            <div className="col-12">
              {headerText}
              {!(location.pathname.includes('/Results')) &&
                <h2 className="neptune sub_heading">A comprehensive list of UK businesses used by government for statistical purposes</h2>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  currentlySending: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const select = (state) => ({
  loggedIn: state.login.loggedIn,
  username: state.login.username,
  currentlySending: state.login.currentlySending,
});

export default withRouter(connect(select)(Header));
