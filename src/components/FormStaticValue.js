import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

const FormStaticValue = ({ id, label, value }) => {
  return (
    <FormGroup controlId={id}>
     <Col componentClass={ControlLabel} sm={6}>
       {label}
     </Col>
     <Col sm={6}>
       <FormControl.Static>{value}</FormControl.Static>
     </Col>
   </FormGroup>
  );
};

FormStaticValue.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default FormStaticValue;
