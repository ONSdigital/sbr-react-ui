import React from 'react';
import PropTypes from 'prop-types';
import Button from '../patterns/Button';

/**
 * @const ResultsSearchForm - The search form for the results page.
 */
const ResultsSearchForm = (props) => (
  <section>
    <div className="search_bar">
      <div className="wrapper">
        <div className="group">
          <div className="col-9">
            <div className="field u-mb-s">
              <label htmlFor="text-input" className="label">Reference number</label>
              <input className="input input--text input-type__input sbr-search-input" type="text" id="text-input" onChange={props.onChange} value={props.query} />
            </div>
          </div>
          <div className="col-3">
            <Button className="btn btn--primary venus three-col-button" id="searchButton" type="submit" text="Search" onClick={props.onSubmit} ariaLabel="Search Button" loading={props.currentlySending} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

ResultsSearchForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default ResultsSearchForm;
