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
          PostCode: legalUnit.vars.postCode,
          'Industry Code': legalUnit.vars.industryCode,
          'Legal Status': legalUnit.vars.legalStatus,
          'Trading Status': legalUnit.vars.tradingStatus,
          Turnover: legalUnit.vars.turnover,
          'Employment Bands': legalUnit.vars.employmentBands,
          'Company Number': legalUnit.vars.companyNo,
        }}
      />
    );
  }
}

LegalUnitProfile.propTypes = {
  unit: PropTypes.object.isRequired,
};

export default LegalUnitProfile;
