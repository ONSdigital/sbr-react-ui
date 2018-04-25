import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BreadCrumb from './BreadCrumb';
import Badge from '../patterns/Badge';
import Id from '../patterns/Id';
import DataPanel from '../patterns/DataPanel';

/**
 * @class PAYEProfile - 
 */
class PAYEProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }
  render = () => {
    const paye = this.props.paye;
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
                  <h3 className="jupiter sml-margin">{paye.vars.name1}</h3>
                  <Badge name="PAYE" colour="green" />
                  <Id field="PAYEREF" id={paye.id} />
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

PAYEProfile.defaultProps = {
  paye: null,
};

PAYEProfile.propTypes = {
  paye: PropTypes.object,
};

const select = (state) => ({ paye: state.apiSearch.units.PAYE });

export default connect(select)(PAYEProfile);
