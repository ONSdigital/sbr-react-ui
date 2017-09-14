import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getSpecificUnitType } from '../actions/ApiActions';

const FormLink = ({ id, label, value, unitType, dispatch }) => {
  return (
    <FormGroup controlId={id}>
     <Col componentClass={ControlLabel} sm={6}>
       {label}
     </Col>
     <Col sm={6}>
       <FormControl.Static><Link onClick={() => dispatch(getSpecificUnitType(unitType, value, true))}>{value}</Link></FormControl.Static>
     </Col>
   </FormGroup>
  );
};

FormLink.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  unitType: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch,
  };
}

export default connect(select)(FormLink);
