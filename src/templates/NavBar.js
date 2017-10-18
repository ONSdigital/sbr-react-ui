import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'registers-react-library';
import '../resources/css/mycss.css';

class NavBarTemplate extends React.Component {
  render() {
    return (
      <NavBar
        primary={this.props.primary}
        navBarItems={[
          { text: 'Home', link: '/Home' },
          { text: 'Search', link: '/RefSearch' },
        ]}
      />
    );
  }
}

NavBarTemplate.propTypes = {
  primary: PropTypes.string.isRequired,
};

export default NavBarTemplate;
