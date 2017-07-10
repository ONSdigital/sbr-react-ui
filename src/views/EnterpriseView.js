import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import EnterprisePanel from '../components/EnterprisePanel';

class EnterpriseView extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Enterprise View</PageHeader>
        <EnterprisePanel
          key={this.props.data[0].idbr}
          defaultExpand={true}
          enterprise={this.props.data[0]}
        />
      </div>
    );
  }
}

// EnterpriseView.propTypes = {
//   data: React.PropTypes.shape({
//     name: PropTypes.string.isRequired,
//   }).isRequired,
// };

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(EnterpriseView);
