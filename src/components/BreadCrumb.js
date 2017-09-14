import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getSpecificUnitType } from '../actions/ApiActions';

const BreadCrumb = ({ breadCrumbItems, title, description, marginBottom, dispatch }) => {
  function getBreadCrumbItems() {
    return breadCrumbItems.map((obj) => {
      if (obj.link === '') {
        return (<li key={obj.name} className="breadcrumb__item">
          {obj.name}
        </li>);
      }
      return (<li key={obj.name} className="breadcrumb__item">
        <Link onClick={() => dispatch(getSpecificUnitType(obj.unitType, obj.name, true))} style={{ cursor: 'pointer' }}>
          {obj.name}
        </Link>
      </li>);
    });
  }
  return (
    <div className="page-intro background--gallery">
      <div className="wrapper">
        <div className="col-wrap">
          <div className="col">
            <nav>
              <div className="breadcrumb print--hide">
                <ol className="breadcrumb__list">
                  <li className="breadcrumb__item">
                    <Link to="/Home">
                      <a className="breadcrumb__link">
                        Home
                      </a>
                    </Link>
                  </li>
                  {getBreadCrumbItems()}
                </ol>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};


BreadCrumb.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  marginBottom: PropTypes.number.isRequired,
  breadCrumbItems: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch,
  };
}

export default connect(select)(BreadCrumb);
