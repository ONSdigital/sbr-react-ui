import React from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../components/BreadCrumb';

const style = {
  width: '270px',
};

const TechnicalInformation = ({ uiVersion, apiVersion, uiLastUpdate, apiLastUpdate }) => {
  const items = [
    { name: 'Technical Information', link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="Technical Information"
        description="Information regarding what versions are being used"
        marginBottom={1}
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <p className="page-intro__content col col--md-47 col--lg-30">
          UI Version - {uiVersion}
            <br /><br />
          UI Last Upate - {uiLastUpdate}
          </p>
          <p className="page-intro__content col col--md-47 col--lg-29">
          API Version - {apiVersion}
            <br /><br />
          API Last Update - {apiLastUpdate}
          </p>
        </div>
      </div>
    </div>
  );
};

TechnicalInformation.propTypes = {
  uiVersion: React.PropTypes.string.isRequired,
  apiVersion: React.PropTypes.string.isRequired,
  uiLastUpdate: React.PropTypes.string.isRequired,
  apiLastUpdate: React.PropTypes.string.isRequired,
};

function select(state) {
  return {
    uiVersion: state.info.ui.version,
    apiVersion: state.info.api.version,
    uiLastUpdate: state.info.ui.lastUpdate,
    apiLastUpdate: state.info.ui.lastUpdate,
  };
}

export default connect(select)(TechnicalInformation);
