import React from 'react';
import PropTypes from 'prop-types';
import DataPanel from '../patterns/DataPanel';

/**
 * @class LegalUnitProfile - The panel to display Legal Unit data
 */
const LegalUnitProfile = ({ unit }) => (
  <DataPanel
    data={{
      PostCode: unit.vars.PostCode,
      'Industry Code': unit.vars.IndustryCode,
      'Legal Status': unit.vars.LegalStatus,
      'Trading Status': unit.vars.TradingStatus,
      Turnover: unit.vars.Turnover,
      'Employment Bands': unit.vars.EmploymentBands,
      'Company Number': unit.vars.CompanyNo,
    }}
  />
);

LegalUnitProfile.propTypes = {
  unit: PropTypes.object.isRequired,
};

export default LegalUnitProfile;
