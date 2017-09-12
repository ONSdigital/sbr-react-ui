import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

const FormStaticDatedValue = ({ id, label, value, date }) => {
  return (
    <FormGroup controlId={id}>
     <Col componentClass={ControlLabel} sm={6}>
       {label}
     </Col>
     <Col sm={6}>
       <FormControl.Static>{value}<br/>({date})</FormControl.Static>
     </Col>
   </FormGroup>
  );
};

FormStaticDatedValue.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default FormStaticDatedValue;
