import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import EnterprisePanel from '../components/EnterprisePanel';

const EnterpriseView = function ({ routeParams, data }) {
  return (
    <div>
      <PageHeader>Enterprise View</PageHeader>
      <EnterprisePanel
        key={data[routeParams.index].ubrn}
        enterprise={data[routeParams.index]}
      />
    </div>
  );
};

EnterpriseView.propTypes = {
  data: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(EnterpriseView);
