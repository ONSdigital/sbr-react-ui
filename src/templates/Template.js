import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import NavBar from './NavBar';
import Banner from './Banner';
import config from '../config/constants';

const { ENV } = config;

const Template = function (props) {
  const onProdEnv = (ENV === 'prod');
  const banner = (onProdEnv) ? '' : (<Banner />);
  if (props.location.pathname === '/' || props.location.pathname === 'Login') {
    return (
      <div>
        {banner}
        <div className="container">
          <Header />
          {props.children}
        </div>
      </div>
    );
  }
  return (
    <div>
      {banner}
      <div className="container">
        <Header />
        <NavBar />
        {props.children}
      </div>
    </div>
  );
};

Template.propTypes = {
  location: React.PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.object.isRequired,
};

export default Template;
