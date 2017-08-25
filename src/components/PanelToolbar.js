import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { connect } from 'react-redux';
import { getLegalUnit, refSearch, setQuery } from '../actions/ApiActions';
import { SET_REF_QUERY } from '../constants/ApiConstants';

const PanelToolbar = ({ dispatch, data, pageType, parents, children }) => {
  function onSubmit(e) {
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
    <Button bsStyle="primary" loading={data.currentlySending} onClick={onSubmit}>Go to parent ({parentType})</Button>
  ) : (<div></div>);
  return (
    <ButtonToolbar>
      {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
      {goToParentButton}
    </ButtonToolbar>
  );
};

PanelToolbar.propTypes = {
  pageType: PropTypes.string.isRequired,
  parents: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.legalUnit,
  };
}

export default connect(select)(PanelToolbar);
