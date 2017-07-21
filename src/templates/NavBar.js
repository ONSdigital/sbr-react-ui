import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions/LoginActions';
import UserDetailsModal from '../components/UserDetailsModal';
import InfoModal from '../components/InfoModal';
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
					<span className="nav--controls__text">Search</span>
				</a>
			</li>
		</ul>
		<div className="wrapper nav-main--hidden" id="nav-primary">
			<ul className="primary-nav__list">
				<li className="primary-nav__item js-nav hide--mobile old-ie--display-block"><a className="primary-nav__link col col--md-7 col--lg-9" href="/">Home</a></li>
        <li className="primary-nav__item js-nav hide--mobile old-ie--display-block"><a className="primary-nav__link col col--md-7 col--lg-9" href="/Search">Search</a></li>
				<li className="primary-nav__item js-nav js-expandable ">
					<a className="primary-nav__link col col--md-8 col--lg-10" href="/economy" aria-haspopup="true">Economy</a>
					<ul className="primary-nav__child-list col col--md-16 col--lg-20 js-expandable__content js-nav-hidden jsEnhance" aria-expanded="false" aria-label="submenu">
						<li className="primary-nav__child-item  js-expandable__child">
							<a className="primary-nav__child-link" tabindex="-1" href="/economy/economicoutputandproductivity" >Economic output and productivity</a>
						</li>
						<li className="primary-nav__child-item  js-expandable__child">
							<a className="primary-nav__child-link" tabindex="-1" href="/economy/environmentalaccounts" >Environmental accounts</a>
						</li>
						<li className="primary-nav__child-item  js-expandable__child">
							<a className="primary-nav__child-link" tabindex="-1" href="/economy/governmentpublicsectorandtaxes" >Government, public sector and taxes</a>
						</li>
					</ul>
				</li>
				<li className="primary-nav__item js-nav js-expandable ">
					<a className="primary-nav__link col col--md-8 col--lg-10" href="/employmentandlabourmarket" aria-haspopup="true">Employment and labour market</a>
					<ul className="primary-nav__child-list col col--md-16 col--lg-20 js-expandable__content js-nav-hidden jsEnhance" aria-expanded="false" aria-label="submenu">
						<li className="primary-nav__child-item  js-expandable__child">
							<a className="primary-nav__child-link" tabindex="-1" href="/employmentandlabourmarket/peopleinwork" >People in work</a>
						</li>
						<li className="primary-nav__child-item  js-expandable__child">
							<a className="primary-nav__child-link" tabindex="-1" href="/employmentandlabourmarket/peoplenotinwork" >People not in work</a>
						</li>
					</ul>
				</li>
				<li className="primary-nav__item js-nav js-expandable ">
					<a className="primary-nav__link col col--md-8 col--lg-10" href="/peoplepopulationandcommunity" aria-haspopup="true">People, population and community</a>
					<ul className="primary-nav__child-list col col--md-16 col--lg-20 js-expandable__content js-nav-hidden jsEnhance" aria-expanded="false" aria-label="submenu">
						<li className="primary-nav__child-item  js-expandable__child">
							<a className="primary-nav__child-link" tabindex="-1" href="/peoplepopulationandcommunity/birthsdeathsandmarriages" >Births, deaths and marriages</a>
						</li>
						<li className="primary-nav__child-item  js-expandable__child">
							<a className="primary-nav__child-link" tabindex="-1" href="/peoplepopulationandcommunity/community" >Community</a>
						</li>
						<li className="primary-nav__child-item  js-expandable__child">
							<a className="primary-nav__child-link" tabindex="-1" href="/peoplepopulationandcommunity/crimeandjustice" >Crime and justice</a>
						</li>
						<li className="primary-nav__child-item  js-expandable__child">
							<a className="primary-nav__child-link" tabindex="-1" href="/peoplepopulationandcommunity/culturalidentity" >Cultural identity</a>
						</li>
					</ul>
				</li>
				<li className="primary-nav__item  js-nav">
					<a className="primary-nav__link  col col--md-8 col--lg-10" href="/surveys">
						Taking part in a survey?
					</a>
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
