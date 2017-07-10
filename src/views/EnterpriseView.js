import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import EnterprisePanel from '../components/EnterprisePanel';

const EnterpriseView = function ({ data }) {
  return (
    <div>
      <PageHeader>Enterprise View</PageHeader>
      <EnterprisePanel
        key={data[0].ubrn}
        defaultExpand
        enterprise={data[0]}
      />
    </div>
  );
};

EnterpriseView.propTypes = {
  data: React.PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(EnterpriseView);
