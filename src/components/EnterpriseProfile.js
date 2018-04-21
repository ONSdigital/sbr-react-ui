import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BreadCrumb from './BreadCrumb';
import Badge from '../patterns/Badge';
import Id from '../patterns/Id';

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
    console.log('Ent: ', this.props.enterprise);
    return (
      <section>
        <div className="main-content">
          <div className="wrapper">
            <div className="group">
              <div className="col-12">
                <h3 className="jupiter sml-margin">Tesco Stores Ltd Inc Tesco Distribution</h3>
                <Badge name="Enterprise" colour="blue" />
                <Id field="ERN" id={this.props.enterprise.id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

EnterpriseProfile.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

const select = (state) => ({ enterprise: state.apiSearch.units.ENT });

export default connect(select)(EnterpriseProfile);
