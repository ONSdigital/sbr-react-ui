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
    console.log('THIS PROPS: ', this.props);
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
                  <h3 className="jupiter sml-margin">Tesco Stores Ltd Inc Tesco Distribution</h3>
                  <Badge name="Enterprise" colour="blue" />
                  <Id field="ERN" id={this.props.enterprise.id} />
                  <DataPanel
                    data={{
                      EntRef: this.props.enterprise.vars.entref,
                      PostCode: this.props.enterprise.vars.postcode,
                      'Legal Status': this.props.enterprise.vars.legalstatus,
                      'PAYE Employees': this.props.enterprise.vars.paye_employees,
                      'PAYE Jobs': this.props.enterprise.vars.paye_jobs,
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
