import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ButtonToolbar, Glyphicon } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { connect } from 'react-redux';
import { refSearch } from '../actions/ApiActions';

const PanelToolbar = ({ dispatch, data, pageType, parents }) => {
  function goToParent(e) {
    e.preventDefault();
    switch (pageType) {
      case 'LEU':
        dispatch(refSearch(parents.ENT));
        break;
      case 'REF':
        dispatch(refSearch(parents.LEU));
        break;
      default:
        break;
    }
  }
  const parentType = (pageType === 'REF') ? 'LEU' : 'ENT';
  const goToParentButton = (pageType !== 'ENT') ? (
    <Button bsStyle="primary" loading={data.currentlySending} onClick={goToParent}>Go to parent ({parentType})</Button>
  ) : (<div></div>);
  const goToEnterprise = (pageType === 'REF') ? (
    <Button bsStyle="primary" loading={data.currentlySending} onClick={() => dispatch(refSearch(parents.ENT))}><Glyphicon glyph="tower"/> Enterprise</Button>
  ) : (<div></div>);
  return (
    <ButtonToolbar>
      <Button bsStyle="primary" onClick={() => browserHistory.push('/TreeView1')} loading={data.currentlySending}><Glyphicon glyph="tree-deciduous"/> Tree 1</Button>
      <Button bsStyle="primary" onClick={() => browserHistory.push('/TreeView2')} loading={data.currentlySending}><Glyphicon glyph="tree-deciduous"/> Tree 2</Button>
      {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
      {goToEnterprise}
      {goToParentButton}
    </ButtonToolbar>
  );
};

PanelToolbar.propTypes = {
  pageType: PropTypes.string.isRequired,
  parents: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch,
  };
}

export default connect(select)(PanelToolbar);
