import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

const FormStaticThreePartValue = ({ id, label, value1, value2, value3 }) => {
  return (
    <FormGroup controlId={id}>
     <Col componentClass={ControlLabel} sm={6}>
       {label}
     </Col>
     <Col sm={6}>
       <FormControl.Static>{value1}<br/>{value2}<br/>{value3}</FormControl.Static>
     </Col>
   </FormGroup>
  );
};

FormStaticThreePartValue.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value1: PropTypes.string.isRequired,
  value2: PropTypes.string.isRequired,
  value3: PropTypes.string.isRequired
};

export default FormStaticThreePartValue;
