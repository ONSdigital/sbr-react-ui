import React from 'react';
import PropTypes from 'prop-types';
import DataPanel from '../patterns/DataPanel';

/**
 * @class LegalUnitProfile - 
 */
class LegalUnitProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
    };
  }
  render = () => {
    const legalUnit = this.props.unit;
    return (
      <DataPanel
        data={{
          PostCode: legalUnit.vars.PostCode,
          'Industry Code': legalUnit.vars.IndustryCode,
          'Legal Status': legalUnit.vars.LegalStatus,
          'Trading Status': legalUnit.vars.TradingStatus,
          Turnover: legalUnit.vars.Turnover,
          'Employment Bands': legalUnit.vars.EmploymentBands,
          'Company Number': legalUnit.vars.CompanyNo,
        }}
      />
    );
  }
}

LegalUnitProfile.propTypes = {
  unit: PropTypes.object.isRequired,
};

export default LegalUnitProfile;
