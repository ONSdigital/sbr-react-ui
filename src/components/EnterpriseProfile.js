import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BreadCrumb from './BreadCrumb';
import Badge from '../patterns/Badge';
import Id from '../patterns/Id';
import DataPanel from '../patterns/DataPanel';
import ChildTabs from './ChildTabs';

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
    const enterprise = this.props.enterprise;
    const breadCrumbItems = [
      { name: `Enterprise - ${enterprise.id}`, link: '' },
    ];
    return (
      <section>
        <BreadCrumb breadCrumbItems={breadCrumbItems} />
        <section>
          <div className="main-content">
            <div className="wrapper">
              <div className="group">
                <div className="col-12">
                  <h3 className="jupiter sml-margin">{enterprise.vars.name}</h3>
                  <Badge name="Enterprise" colour="blue" />
                  <Id field="ERN" id={enterprise.id} />
                  <DataPanel
                    data={{
                      EntRef: enterprise.vars.entref,
                      PostCode: enterprise.vars.postcode,
                      'Legal Status': enterprise.vars.legalstatus,
                      'PAYE Employees': enterprise.vars.paye_employees,
                      'PAYE Jobs': enterprise.vars.paye_jobs,
                    }}
                  />
                  <ChildTabs unitType="ENT" childRefs={enterprise.children} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

EnterpriseProfile.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

const select = (state) => ({ enterprise: state.apiSearch.units.ENT });

export default connect(select)(EnterpriseProfile);
