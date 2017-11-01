import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

const FormStaticValue = ({ id, label, value, tooltipText }) => {
  return (
    <FormGroup controlId={id}>
      <Col componentClass={ControlLabel} sm={6}>
        <label htmlFor={id} data-tip="panel-title-data-tip" data-for={`${id}-tooltip`}>{label}</label>
      </Col>
      <Col sm={6}>
        <FormControl.Static>{value}</FormControl.Static>
      </Col>
      {tooltipText !== '' &&
        <ReactTooltip id={`${id}-tooltip`} type="info">
          {tooltipText}
        </ReactTooltip>
      }
    </FormGroup>
  );
};

FormStaticValue.defaultProps = {
  tooltipText: '',
};

FormStaticValue.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
};

export default FormStaticValue;
