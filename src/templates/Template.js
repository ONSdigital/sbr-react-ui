import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import NavBar from './NavBar';
import Banner from './Banner';
import Footer from './Footer';
import config from '../config/constants';

const { ENV } = config;

const Template = (props) => {
  const onProdEnv = (ENV === 'prod');
  const banner = (onProdEnv) ? '' : (<Banner />);
  if (props.location.pathname === '/' || props.location.pathname === 'Login') {
    return (
      <div className={(props.currentlySending) ? 'blur' : ''}>
        {banner}
        <div className="container">
          <Header />
          {props.children}
        </div>
        {props.currentlySending &&
          <div className="spinner"></div>
        }
      </div>
    );
  }
  return (
    <div className={(props.currentlySending) ? 'blur' : ''}>
      {banner}
      <Header />
      <NavBar primary={props.location.pathname} />
      <div className="container">
        {props.children}
      </div>
      <Footer />
      {props.currentlySending &&
        <div className="spinner"></div>
      }
    </div>
  );
};

Template.propTypes = {
  location: React.PropTypes.shape({
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
