import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BreadCrumb from './BreadCrumb';
import Badge from '../patterns/Badge';
import Id from '../patterns/Id';
import DataPanel from '../patterns/DataPanel';

/**
 * @class EnterpriseProfile - 
 */
class VATProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }
  render = () => {
    const vat = this.props.vat;
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
                  <h3 className="jupiter sml-margin">{vat.vars.name1}</h3>
                  <Badge name="VAT" colour="blue" />
                  <Id field="VATREF" id={vat.id} />
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

VATProfile.defaultProps = {
  vat: null,
};

VATProfile.propTypes = {
  vat: PropTypes.object,
};

const select = (state) => ({ vat: state.apiSearch.units.VAT });

export default connect(select)(VATProfile);
