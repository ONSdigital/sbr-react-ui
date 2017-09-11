import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';


const FormStaticAddress = ({ id, label, address1, address2, address3, address4, address5, postcode }) => {
  const url = `https://www.google.co.uk/maps/place/${postcode}`;
  const mapsLink = <a href={url} target="_blank">{postcode}</a>;
  return (
    <FormGroup controlId={id}>
     <Col componentClass={ControlLabel} sm={6}>
       {label}
     </Col>
     <Col sm={6}>
       <FormControl.Static>{address1}<br/>{address2}<br/>{address3}<br/>{address4}<br/>{address5}<br/>{mapsLink}</FormControl.Static>
     </Col>
   </FormGroup>
  );
};

FormStaticAddress.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FormStaticAddress;
