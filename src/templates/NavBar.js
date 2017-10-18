import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import '../resources/css/mycss.css';

class NavBar extends React.Component {
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
                    Search
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
  primary: PropTypes.string.isRequired,
};

export default NavBar;
