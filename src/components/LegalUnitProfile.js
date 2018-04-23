import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BreadCrumb from './BreadCrumb';
import Badge from '../patterns/Badge';
import Id from '../patterns/Id';
import DataPanel from '../patterns/DataPanel';
import ChildTabs from './ChildTabs';

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
    const legalUnit = this.props.legalUnit;
    const breadCrumbItems = [
      { name: `Enterprise - ${legalUnit.parents.ENT}`, link: `/Results/Enterprise/${legalUnit.parents.ENT}` },
      { name: `Legal Unit - ${legalUnit.id}`, link: '' },
    ];
    return (
      <section>
        <BreadCrumb breadCrumbItems={breadCrumbItems} />
        <section>
          <div className="main-content">
            <div className="wrapper">
              <div className="group">
                <div className="col-12">
                  <h3 className="jupiter sml-margin">{legalUnit.vars.businessName}</h3>
                  <Badge name="Legal Unit" colour="teal" />
                  <Id field="UBRN" id={legalUnit.id} />
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
                  <ChildTabs unitType="LEU" childRefs={legalUnit.children} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

LegalUnitProfile.propTypes = {
  legalUnit: PropTypes.object.isRequired,
};

const select = (state) => ({ legalUnit: state.apiSearch.units.LEU });

export default connect(select)(LegalUnitProfile);
