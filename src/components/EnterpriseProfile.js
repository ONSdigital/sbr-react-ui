import React from 'react';
import PropTypes from 'prop-types';
import DataPanel from '../patterns/DataPanel';

/**
 * @const EnterpriseProfile - The panel to display Enterprise data
 */
const EnterpriseProfile = ({ unit }) => (
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

EnterpriseProfile.propTypes = {
  unit: PropTypes.object.isRequired,
};

export default EnterpriseProfile;
