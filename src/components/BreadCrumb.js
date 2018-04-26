import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUnitForPeriod } from '../actions/ApiActions';

/**
 * @class BreadCrumb - 
 */
class BreadCrumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
    };
  }
  render = () => {
    const breadCrumbItems = this.props.breadCrumbItems;
    const itemsLength = breadCrumbItems.length;
    const chevron = (<span className="breadcrumb__chevron">&nbsp;&gt;&nbsp;</span>);
    return (
      <section>
        <div className="wrapper">
          <div className="group">
            <div className="col-12">
              <nav className="breadcrumb">
                <ul className="breadcrumb__items pluto">
                  <li className="breadcrumb__item">
                    <Link to="/Home" className="breadcrumb__link">Search</Link>
                    {chevron}
                  </li>
                  {
                    this.props.breadCrumbItems.map((value, key) => {
                      if (key === (itemsLength - 1)) {
                        return (
                          <li key={value.name} className="breadcrumb__item breadcrumb__item--current">{value.name}</li>
                        );
                      }
                      if (value.name.includes('Legal Unit')) {
                        // We might not have the parent legal unit in the store, so we need to search for it
                        return (
                          <li key={value.name} className="breadcrumb__item">
                            <a style={{ cursor: 'pointer' }} onClick={() => this.props.getUnitForPeriod(value.id, 'LEU', value.period, true)} className="breadcrumb__link">{value.name}</a>
                            {chevron}
                          </li>
                        );
                      } else {
                        return (
                          <li key={value.name} className="breadcrumb__item">
                            <Link to={value.link} className="breadcrumb__link">{value.name}</Link>
                            {chevron}
                          </li>
                        );
                      }
                    })
                  }
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

BreadCrumb.propTypes = {
  breadCrumbItems: PropTypes.array.isRequired,
  getUnitForPeriod: PropTypes.func.isRequired,
};

export default connect(null, { getUnitForPeriod })(BreadCrumb);
