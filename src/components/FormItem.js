import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const FormItem = ({ id, label, help, ref, value, disabled, props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl disabled={disabled} value={value} {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};


// FormItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   help: PropTypes.string.isRequired,
//   ref: 
//   props: PropTypes.object.isRequired,
// };

export default FormItem;
