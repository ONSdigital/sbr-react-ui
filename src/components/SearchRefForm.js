import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';

const SearchRefForm = function ({
  currentlySending, onSubmit, onChange, value, valid,
}) {
  return (
    <form method="get">
      <div style={{ width: '50%' }}>
        <FormGroup
          controlId="formBasicText"
          validationState={valid}
        >
          <ControlLabel>Enter reference number:</ControlLabel>
          <FormControl
            type="text"
            value={value}
            autoFocus
            placeholder="Enter ref to search..."
            maxLength="12"
            onChange={onChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </div>
      <Button
        bsStyle="primary"
        type="submit"
        id="searchButton"
        loading={currentlySending}
        disabled={currentlySending}
        onClick={!currentlySending ? onSubmit : null}
      >
        {currentlySending ? '' : 'Search' }
      </Button>
    </form>
  );
};

SearchRefForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  valid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchRefForm;
