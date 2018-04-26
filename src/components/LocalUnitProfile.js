import React from 'react';
import PropTypes from 'prop-types';
import DataPanel from '../patterns/DataPanel';

/**
 * @const LocalUnitProfile - The panel to display Local Unit data
 */
const LocalUnitProfile = ({ unit }) => (
  <DataPanel
    data={{
      luref: unit.vars.luref,
      'Trading Style': unit.vars.tradingStyle,
      'Sic 07': unit.vars.sic07,
      Employees: unit.vars.employees,
      ern: unit.vars.enterprise.ern,
      entref: unit.vars.enterprise.entref,
      'Address Line 1': unit.vars.address.line1,
      'Address Line 2': unit.vars.address.line2,
      'Address Line 3': unit.vars.address.line3,
      'Address Line 4': unit.vars.address.line4,
      'Address Line 5': unit.vars.address.line5,
      PostCode: unit.vars.address.postcode,
    }}
  />
);

LocalUnitProfile.propTypes = {
  unit: PropTypes.object.isRequired,
};

export default LocalUnitProfile;
