import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const FormItem = ({ id, label, help, value, disabled, onInput, props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl onChange={onInput} disabled={disabled} value={value} {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};


FormItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onInput: PropTypes.func,
  props: PropTypes.object,
};

export default FormItem;
