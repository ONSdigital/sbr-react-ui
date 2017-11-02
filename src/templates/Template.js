import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import NavBar from './NavBar';
import Banner from './Banner';
import Footer from './Footer';
import ShowConfetti from '../components/Confetti';
import config from '../config/constants';

const { ENV } = config;

const Template = function ({ location, children, currentlySending }) {
  const onProdEnv = (ENV === 'prod');
  const banner = (onProdEnv) ? '' : (<Banner />);
  if (location.pathname === '/' || location.pathname === 'Login') {
    return (
      <div className={(currentlySending) ? 'blur' : ''}>
        {banner}
        <div className="container">
          <Header />
          {children}
        </div>
        {currentlySending &&
          <div className="spinner"></div>
        }
      </div>
    );
  }
  return (
    <div className={(currentlySending) ? 'blur' : ''} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <ShowConfetti seconds={config.SHOW_CONFETTI_TIME} />
      {banner}
      <Header />
      <NavBar primary={location.pathname} />
      <div className="container">
        {children}
      </div>
      <Footer />
      {currentlySending &&
        <div className="spinner"></div>
      }
    </div>
  );
};

Template.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.object.isRequired,
  currentlySending: PropTypes.bool.isRequired,
};

function select(state) {
  return {
    currentlySending: state.login.currentlySending,
  };
}

export default connect(select)(Template);
