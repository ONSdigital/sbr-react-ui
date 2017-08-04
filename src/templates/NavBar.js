import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { logout } from '../actions/LoginActions';
import '../resources/css/mycss.css';

class NavBar extends React.Component {
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout() {
    this.props.dispatch(logout());
  }
  render() {
    return (
      <div className="primary-nav print--hide">
        <nav>
          <ul className="nav--controls">
            <li className="nav--controls__item">
              <a href="#nav-primary" id="menu-toggle" aria-controls="nav-primary" className="nav--controls__menu">
                <span className="nav--controls__text">Menu</span>
              </a>
            </li>
            <li className="nav--controls__item ">
              <a href="#nav-search" id="search-toggle" aria-controls="nav-search" className="nav--controls__search">
                <span className="nav--controls__text">Reference Search</span>
              </a>
            </li>
          </ul>
          <div className="wrapper nav-main--hidden" id="nav-primary">
            <ul className="primary-nav__list">
              <li className="primary-nav__item js-nav hide--mobile old-ie--display-block">
                <Link className="primary-nav__link col col--md-7 col--lg-9" to="/Home">
                    Home
                </Link>
              </li>
              <li className="primary-nav__item js-nav hide--mobile old-ie--display-block">
                <Link className="primary-nav__link col col--md-7 col--lg-9" to="/RefSearch">
                    Ref Search
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: React.PropTypes.shape({
    currentlySending: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state.login,
  };
}

// If we use 'export default connect()(NavBar)', there is an issue with redux
// affecting shouldComponentUpdate(), which means the NavBar items don't
// highlight on a change of route, the below fixes this issue.
// https://github.com/reactjs/react-redux/blob/v4.0.0/docs/troubleshooting.md

// Wrap the component to inject dispatch and state into it
export default connect(select, null, null, {
  pure: false,
})(NavBar);
