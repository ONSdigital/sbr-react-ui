import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import NavBar from './NavBar';

const Template = function (props) {
  if (props.location.pathname === '/' || props.location.pathname === 'Login') {
    return (
      <div className="container" id="wholePage">
        <Header />
        {props.children}
      </div>
    );
  }
  return (
    <div className="container" id="wholePage">
      <Header />
      <NavBar />
      {props.children}
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
