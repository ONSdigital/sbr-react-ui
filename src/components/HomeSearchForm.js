import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../patterns/TextInput';
import Button from '../patterns/Button';

/**
 * @const HomeSearchForm - The form for the main search on the home page.
 */
const HomeSearchForm = (props) => (
  <form className="form">
    <TextInput labelClass="label__description" autoFocus legend="Reference number" id="Id" size="u-mb-s" onChange={props.onChange} type="bi-search-input" label="ERN, UBRN, CRN, VAT or PAYE" value={props.query} />
    <Button className="btn btn--primary venus btn--wide" id="searchButton" type="submit" text="Search" onClick={props.onSubmit} ariaLabel="Search Button" loading={props.currentlySending} />
    <Button className="btn btn--secondary btn--border" id="clearButton" text="Clear" onClick={props.onClear} ariaLabel="Clear Button" type="reset" />
  </form>
);

HomeSearchForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default HomeSearchForm;
