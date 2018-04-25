import React from 'react';
import PropTypes from 'prop-types';
import DataPanel from '../patterns/DataPanel';

/**
 * @class EnterpriseProfile - 
 */
class EnterpriseProfile extends React.Component {
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
          EntRef: unit.vars.entref,
          PostCode: unit.vars.postcode,
          'Legal Status': unit.vars.legalstatus,
          'PAYE Employees': unit.vars.paye_employees,
          'PAYE Jobs': unit.vars.paye_jobs,
        }}
      />
    );
  }
}

EnterpriseProfile.propTypes = {
  unit: PropTypes.object.isRequired,
};

export default EnterpriseProfile;
