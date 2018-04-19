import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class EnterpriseProfile - 
 */
class EnterpriseProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
    };
  }
  render = () => {
    console.log('THIS PROPS: ', this.props)
    return (
      <div>
        <h1>Enterprise</h1>
      </div>
    );
  }
}

export default EnterpriseProfile;
