import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import { Link } from 'react-router';

const FormLink = ({ id, label, value, link }) => {
  return (
    <FormGroup controlId={id}>
     <Col componentClass={ControlLabel} sm={6}>
       {label}
     </Col>
     <Col sm={6}>
       <FormControl.Static><Link to={link}>{value}</Link></FormControl.Static>
     </Col>
   </FormGroup>
  );
};

FormLink.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default FormLink;
