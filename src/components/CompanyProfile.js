import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BreadCrumb from './BreadCrumb';
import Badge from '../patterns/Badge';
import Id from '../patterns/Id';
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
    const company = this.props.company;
    const breadCrumbItems = [
      { name: `Enterprise`, link: '' },
    ];
    return (
      <section>
        <BreadCrumb breadCrumbItems={breadCrumbItems} />
        <section>
          <div className="main-content">
            <div className="wrapper">
              <div className="group">
                <div className="col-12">
                  <h3 className="jupiter sml-margin">{company.vars.companyname}</h3>
                  <Badge name="CH" colour="red" />
                  <Id field="CRN" id={company.id} />
                  <DataPanel
                    data={{
                      Data: 'data',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

CompanyProfile.defaultProps = {
  company: null,
};

CompanyProfile.propTypes = {
  company: PropTypes.object,
};

const select = (state) => ({ company: state.apiSearch.units.CH });

export default connect(select)(CompanyProfile);
