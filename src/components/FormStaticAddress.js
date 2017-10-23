import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

const FormStaticAddress = ({ id, label, address1, address2, address3, address4, address5, postcode }) => {
  const url = `https://www.google.co.uk/maps/place/${postcode}`;
  const mapsLink = <a href={url} target="_blank">{postcode}</a>;
  const addressArr = [address1, address2, address3, address4, address5, mapsLink];
  return (
    <FormGroup controlId={id}>
      <Col componentClass={ControlLabel} sm={6}>
        {label}
      </Col>
      <Col sm={6}>
        {
          addressArr.map((addressItem) => {
            if (addressItem !== '' && addressItem !== undefined) {
              return (<FormControl.Static key={`${id}-${addressItem}`} style={{ padding: '0px' }}>{addressItem}</FormControl.Static>);
            }
            return null;
          })
        }
      </Col>
    </FormGroup>
  );
};

FormStaticAddress.defaultProps = {
  address1: '',
  address2: '',
  address3: '',
  address4: '',
  address5: '',
  postcode: '',
};

FormStaticAddress.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  address1: PropTypes.string,
  address2: PropTypes.string,
  address3: PropTypes.string,
  address4: PropTypes.string,
  address5: PropTypes.string,
  postcode: PropTypes.string,
};

export default FormStaticAddress;
