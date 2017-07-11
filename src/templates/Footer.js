import React from 'react';
import { Link } from 'react-router';

const Footer = function () {
  const style = {
    textDecoration: 'none',
    margin: '20px',
    color: 'black',
  };
  return (
    <footer className="footer">
      <div className="container">
        <p style={{ margin: '20px' }} className="text-muted">
          <Link to="/Support" style={style}>Support</Link>
          |
          <Link to="/Help" style={style}>Help</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
