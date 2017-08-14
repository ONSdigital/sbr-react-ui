import React from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../components/BreadCrumb';

const style = {
  width: '260px',
};

const TechnicalInformation = ({ uiVersion, apiVersion }) => {
  const items = [
    { name: 'Technical Information', link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="Technical Information"
        description=""
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <ul className="a-z-list padding-top-md--1 padding-top-sm--1 padding-left-lg--3">
            <li style={style}>
              UI Version: {uiVersion}
            </li>
            <li style={style}>
              API Version: {apiVersion}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

TechnicalInformation.propTypes = {
  uiVersion: React.PropTypes.string.isRequired,
  apiVersion: React.PropTypes.string.isRequired,
};

function select(state) {
  return {
    uiVersion: state.info.ui.version,
    apiVersion: state.info.api.version,
  };
}

export default connect(select)(TechnicalInformation);
