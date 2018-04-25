import React from 'react';
import PropTypes from 'prop-types';
import DataPanel from '../patterns/DataPanel';

/**
 * @class CompanyProfile - 
 */
class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }
  render = () => {
    const unit = this.props.unit;
    return (
      <DataPanel
        data={{
          Data: 'data',
        }}
      />
    );
  }
}

CompanyProfile.propTypes = {
  unit: PropTypes.object.isRequired,
};

export default CompanyProfile;
