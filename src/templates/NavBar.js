import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
  getPrimary(id) {
    const navbarPrimary = (this.props.primary === id) ?
    ('primary-nav__item js-nav hide--mobile old-ie--display-block primary-nav__item--active') :
    ('primary-nav__item js-nav hide--mobile old-ie--display-block');
    return navbarPrimary;
  }
  render() {
    return (
      <div className="primary-nav print--hide">
        <nav>
          <div className="wrapper">
            <ul className="primary-nav__list">
              <li className={this.getPrimary('/Home')}>
                <Link className="primary-nav__link col col--md-7 col--lg-9" to="/Home">
                    Home
                </Link>
              </li>
              <li className={this.getPrimary('/RefSearch')}>
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
  primary: PropTypes.func.isRequired,
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
