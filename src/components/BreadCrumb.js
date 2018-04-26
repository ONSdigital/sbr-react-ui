import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUnitForPeriod } from '../actions/ApiActions';

/**
 * @const BreadCrumb - The BreadCrumb used for navigating to a units parent
 * Legal Unit or Enterprise. The parent/grandparent Enterprise will always
 * be in the redux store, however a parent Legal Unit may not be, so we
 * need to do a search.
 */
const BreadCrumb = ({ breadCrumbItems, getUnit }) => (
  <section>
    <div className="wrapper">
      <div className="group">
        <div className="col-12">
          <nav className="breadcrumb">
            <ul className="breadcrumb__items pluto">
              <li className="breadcrumb__item">
                <Link to="/Home" className="breadcrumb__link">Search</Link>
                <span className="breadcrumb__chevron">&nbsp;&gt;&nbsp;</span>
              </li>
              {
                breadCrumbItems.map((value, key) => {
                  if (key === (breadCrumbItems.length - 1)) {
                    return (
                      <li key={value.name} className="breadcrumb__item breadcrumb__item--current">{value.name}</li>
                    );
                  }
                  if (value.name.includes('Legal Unit')) {
                    // We might not have the parent legal unit in the store, so we need to search for it
                    return (
                      <li key={value.name} className="breadcrumb__item">
                        <a style={{ cursor: 'pointer' }} onClick={() => getUnit(value.id, 'LEU', value.period, true)} className="breadcrumb__link">{value.name}</a>
                        <span className="breadcrumb__chevron">&nbsp;&gt;&nbsp;</span>
                      </li>
                    );
                  } else {
                    return (
                      <li key={value.name} className="breadcrumb__item">
                        <Link to={value.link} className="breadcrumb__link">{value.name}</Link>
                        <span className="breadcrumb__chevron">&nbsp;&gt;&nbsp;</span>
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

BreadCrumb.propTypes = {
  breadCrumbItems: PropTypes.array.isRequired,
  getUnit: PropTypes.func.isRequired,
};

export default connect(null, { getUnit: getUnitForPeriod })(BreadCrumb);
