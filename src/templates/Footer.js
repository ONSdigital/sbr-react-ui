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
          <Link to="/SearchHistory" aria-label="Link to Search History page" style={style}>Search History</Link>
          |
          <Link to="/Support" aria-label="Link to Support page" style={style}>Support</Link>
          |
          <Link to="/Help" aria-label="Link to Help page" style={style}>Help</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
