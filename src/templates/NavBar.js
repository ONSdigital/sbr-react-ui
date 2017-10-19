import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'registers-react-library';
import '../resources/css/mycss.css';

const NavBarTemplate = ({ primary }) => {
  return (
    <NavBar
      primary={primary}
      navBarItems={[
        { text: 'Home', link: '/Home' },
        { text: 'Search', link: '/RefSearch' },
      ]}
    />
  );
};

NavBarTemplate.propTypes = {
  primary: PropTypes.string.isRequired,
};

export default NavBarTemplate;
