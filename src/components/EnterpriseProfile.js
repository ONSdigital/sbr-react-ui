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
                <div className="panel panel--simple panel--info u-mb-l">
                  <table className="unit-info">
                    <tr>
                      <th className="mars">Address</th>
                      <td className="venus">123 Mini Street, Hatfield, AL7 1GA</td>
                    </tr>
                    <tr>
                      <th className="mars">Industry</th>
                      <td className="venus">74990 – Other professional, scientific and technical activities</td>
                    </tr>
                    <tr>
                      <th className="mars">Legal status</th>
                      <td className="venus">Company</td>
                    </tr>
                    <tr>
                      <th className="mars">Trading status</th>
                      <td className="venus">Active</td>
                    </tr>
                    <tr>
                      <th className="mars">Employment band</th>
                      <td className="venus">–</td>
                    </tr>
                    <tr>
                      <th className="mars">Turnover band</th>
                      <td className="venus">–</td>
                    </tr>
                  </table>
                </div>
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
