import React, { PropTypes } from 'react';
import Header from './Header';
import NavBar from './NavBar';

const Template = function (props) {
  if (props.location.pathname === '/' || props.location.pathname === 'Login') {
    return (
      <div className="container">
        <Header />
        {props.children}
      </div>
    );
  }
  return (
    <div className="container">
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
